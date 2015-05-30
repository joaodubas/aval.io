package main

import (
	"fmt"
	anthropo "github.com/joaodubas/phass/anthropometry"
	assess "github.com/joaodubas/phass/assessment"
	circ "github.com/joaodubas/phass/circumference"
	"net/http"
	"strconv"
	"time"
)

func anthropometricForm(r *http.Request) (assess.Measurer, error) {
	a := anthropo.NewBMIPrime(0, 0)

	err := r.ParseForm()
	if err != nil {
		return a, err
	}

	weight, err := strconv.ParseFloat(r.Form.Get("weight"), 64)
	if err != nil {
		return a, err
	}

	height, err := strconv.ParseFloat(r.Form.Get("height"), 64)
	if err != nil {
		return a, err
	}

	a = anthropo.NewBMIPrime(weight, height)

	return a, nil
}

func circumferenceForm(r *http.Request, circs ...int) (assess.Measurer, error) {
	c := circ.NewCircumferences(map[int]float64{})

	err := r.ParseForm()
	if err != nil {
		return c, err
	}

	for _, cid := range circs {
		v, err := strconv.ParseFloat(r.Form.Get(circ.NamedCircumference(cid)), 64)
		if err != nil {
			return c, err
		}
		c.Measures[cid] = v
	}

	return c, nil
}

func personForm(r *http.Request) (assess.Measurer, error) {
	p := new(assess.Person)

	err := r.ParseForm()
	if err != nil {
		return p, err
	}

	name := r.Form.Get("fullname")
	if name == "" {
		return p, fmt.Errorf("Missing fullname")
	}

	birth := r.Form.Get("birthday")
	if birth == "" {
		return p, fmt.Errorf("Missing birthday")
	}

	gender, err := strconv.Atoi(r.Form.Get("gender"))
	if err != nil {
		return p, err
	}

	return assess.NewPerson(name, birth, gender)
}

func assessForm(r *http.Request) (assess.Measurer, error) {
	a := new(assess.Assessment)

	err := r.ParseForm()
	if err != nil {
		return a, err
	}

	d := r.Form.Get("date")
	if d == "" {
		d = time.Now().UTC().Format(assess.TimeLayout)
	}

	return assess.NewAssessment(d)
}
