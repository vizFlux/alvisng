import React from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
    displayName: 'HTML',
    propTypes: {
        body: React.PropTypes.string,
    },
    render() {
        const {body, route} = this.props
        const head = Helmet.rewind()
        const font = <link href='https://fonts.googleapis.com/css?family=Roboto:400,400italic,500,700&subset=latin,cyrillic' rel='stylesheet' type='text/css' />
        const monoFont = <link href="https://fonts.googleapis.com/css?family=Open+Sans|Source+Code+Pro:500" rel="stylesheet" />
        let css
        if (process.env.NODE_ENV === 'production') {
            css = <style dangerouslySetInnerHTML={ {    __html: require('!raw!./public/styles.css')} } />
        }

        return (
            <html lang="en" itemScope itemType="http://schema.org/Article">
            <head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=5.0" />
              { head.title.toComponent() }
              { head.meta.toComponent() }
              { head.link.toComponent() }
              { monoFont }
              { font }
              { css }
            </head>
            <body>
              <div id="react-mount" dangerouslySetInnerHTML={ {    __html: this.props.body} } />
              <script src={ prefixLink(`/bundle.js?t=${BUILD_TIME}`) } />
            </body>
            </html>
        )
    },
})
