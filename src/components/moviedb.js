const h = require('react-hyperscript')
const react = require('react')
const xhr = require('xhr')

const {Link} = require('react-router')

const Moviedb = react.createClass({
    getInitialState: function() {
        return {r: 'json', s: '', movie: []}
    },
    changeHandler: function(e) {
        this.setState({s: e.target.value})
    },
    submitHandler: function(e) {
        e.preventDefault()
        xhr({
            method: 'GET',
            json: 'true',
            url: `https://www.omdbapi.com/?r=json&s=${this.state.s}`
        }, (err, response, body) => {
            if (err) {
                console.log("You screwed the pooch")
            }
            this.setState({movie: body.Search})
            console.log(body.Search)
        })
    },
    render: function() {
        console.log(this.state)
        return h('div', [
            h('h1', 'Movies'),
            h('form', {
                onSubmit: this.submitHandler
            }, [h('input', {onChange: this.changeHandler})]),
            h(Link, {
                to: '/',
                className: 'link'
            }, 'Home'),
            h('div', this.state.movie.map(mov =>
                //h('img', {src: mov.Poster})
                h('a.fl.w-50.w-25-l.link.overflow-hidden', { href: "#" }, [
                  h('div.grow.aspect-ratio--4x6', {
                    style: {
                      background: `url(${mov.Poster}) no-repeat center center`,
                      backgroundSize: 'cover'
                    }
                  })
                ])
            ))
        ])
      }
})
module.exports = Moviedb
