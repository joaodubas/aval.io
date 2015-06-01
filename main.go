package main

import (
	"fmt"
	anthropo "github.com/joaodubas/phass/anthropometry"
	assess "github.com/joaodubas/phass/assessment"
	circ "github.com/joaodubas/phass/circumference"
	"net/http"
	"strings"
)

func main() {
	http.HandleFunc("/bmi", errHandler(bmiHandler{}))
	http.HandleFunc("/wth", errHandler(wthHandler{}))
	http.HandleFunc("/cin", errHandler(cinHandler{}))
	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("frontend/dist/"))))
	http.Handle("/", http.FileServer(http.Dir("frontend/src/client")))

	fmt.Println("Started server")
	http.ListenAndServe("127.0.0.1:9080", nil)
}

/**
 * API handlers
 */

// bmiHandler display body mass index info
type bmiHandler struct{}

func (b bmiHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) error {
	bmi, err := anthropometricForm(r)
	if err != nil {
		return err
	}

	rs, err := bmi.Result()
	fmt.Fprint(w, strings.Join(rs, "\n"))
	return nil
}

// wthHandler display waist to hip info
type wthHandler struct{}

func (h wthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) error {
	c, err := circumferenceForm(r, circ.CCFWaist, circ.CCFHip)
	if err != nil {
		return err
	}

	p, err := personForm(r)
	if err != nil {
		return err
	}

	a, err := assessForm(r)
	if err != nil {
		return err
	}

	cc := c.(*circ.Circumferences)
	cp := p.(*assess.Person)
	ca := a.(*assess.Assessment)

	wth := circ.NewWaistToHipRatio(cp, ca, cc.Measures)
	rs, err := wth.Result()
	if err != nil {
		return err
	}
	fmt.Fprint(w, strings.Join(rs, "\n"))
	return nil
}

// cinHandler display conicity index info
type cinHandler struct{}

func (h cinHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) error {
	c, err := circumferenceForm(r, circ.CCFWaist)
	if err != nil {
		return err
	}

	a, err := anthropometricForm(r)
	if err != nil {
		return err
	}

	cc := c.(*circ.Circumferences)
	ca := a.(*anthropo.AnthropometricRatio)

	cin := circ.NewConicityIndex(ca.Anthropometry, cc.Measures)
	rs, err := cin.Result()
	if err != nil {
		return err
	}
	fmt.Fprint(w, strings.Join(rs, "\n"))
	return nil
}

/**
 * Error handlers
 */

// errHandler decorator responsible for handling internal errors. It receives
// a function implementing HandlerFuncWithError and returns a function
// that implements http.HandlerFunc.
func errHandler(h HandlerWithError) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h.ServeHTTP(w, r); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

// type that extends http.HandlerFunc allowing it to return an error
type HandlerWithError interface {
	ServeHTTP(http.ResponseWriter, *http.Request) error
}
