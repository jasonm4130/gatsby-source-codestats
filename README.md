## Description

This is a simple plugin that allows you to pull stats from the profile API of [CodeStats](https://codestats.net/).

The plugin hits the profile endpoint and converts the returned JSON into language, date, and machine nodes which can be accessed via GraphQL. The plugin also creates a user node allowing for multiple queries to be made fetching a number of users, with the user being linked to the languages, dates, and machines.

## How to install

To install the plugin run `npm i gatsby-source-codestats`.

## How to use

```JS
module.exports = {
    plugins: [
        {
            resolve: `gatsby-source-codestats`,
            options: {
                user: "USERNAME", // Required, defines the user to pull stats from the codestats API for
            }
        }
    ]
}
```

## Available options

The plugin only takes one option, `user`, which is required. This defines the user that will be sent to the CodeStats API to pull stats for.

## When do I use this plugin?

This plugin is useful for when you want to pull stats from CodeStats and have them available for use in your Gatsby site at build time.
In most cases you will want to fetch these stats from the API with the page load, this plugin provides a way to fetch the stats at build time for the static generation of a page and then replace these with more up-to-date stats when a user loads the page.

## Examples of usage

### Queries

```JS
const languageStats = useStaticQuery(graphql`
    query {
        allCodeStatsMachine {
            nodes {
            new_xps
            name
            xps
            }
        }
        allCodeStatsUser {
            nodes {
            name
            newXp
            totalXp
            }
        }
        allCodeStatsLanguage {
            nodes {
            name
            new_xps
            xps
            }
        }
        allCodeStatsDate {
            nodes {
            xps
            dateObj
            date
            }
        }
    }
  `)
```

The above query returns a JSON object for use similar to the following:

```JSON
{
  "data": {
    "allCodeStatsMachine": {
      "nodes": [
        {
          "new_xps": 0,
          "name": "Work",
          "xps": 1467991
        },
        {
          "new_xps": 4912,
          "name": "Home PC",
          "xps": 490476
        }
      ]
    },
    "allCodeStatsUser": {
      "nodes": [
        {
          "name": "USERNAME",
          "newXp": 4912,
          "totalXp": 1958467
        }
      ]
    },
    "allCodeStatsLanguage": {
      "nodes": [
        {
          "name": "JavaScript",
          "new_xps": 908,
          "xps": 675279
        }
      ]
    },
    "allCodeStatsDate": {
      "nodes": [
        {
          "xps": 1449,
          "dateObj": "2020-03-11T00:00:00.000Z",
          "date": "2020-03-11"
        }
      ]
    }
  },
  "extensions": {}
}
```

## How to contribute

If you have any questions or run into any issues feel free to raise an issue/bug in this plugins [git repo](https://github.com/jasonm4130/gatsby-source-codestats)
