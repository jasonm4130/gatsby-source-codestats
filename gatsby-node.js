// Import Axios
const axios = require('axios');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// constants for your GraphQL Post and Author types
const USER_NODE_TYPE = `CodeStatsUser`;
const LANGUAGE_NODE_TYPE = `CodeStatsLanguage`;
const MACHINE_NODE_TYPE = `CodeStatsMachine`;
const DATE_NODE_TYPE = `CodeStatsDate`;

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  const { createNode } = actions;

  const response = await axios.get(
    `https://codestats.net/api/users/${pluginOptions.user}`
  );

  //   Create an array from the languages object and add the language key as the name
  const languages = Object.keys(response.data.languages).map((language) => ({
    name: language,
    ...response.data.languages[language],
  }));

  //   Create a node for each language
  languages.forEach((language) => {
    const node = {
      id: createNodeId(`${LANGUAGE_NODE_TYPE}-${language.name}`),
      ...language,
      parent: null,
      children: [],
      internal: {
        type: LANGUAGE_NODE_TYPE,
        content: JSON.stringify(language),
        contentDigest: createContentDigest(language),
      },
    };
    createNode(node);
  });

  // Create an array for the machines
  const machines = Object.keys(response.data.machines).map((machine) => ({
    name: machine,
    ...response.data.machines[machine],
  }));

  // Create a node for each machine
  machines.forEach((machine) => {
    const node = {
      id: createNodeId(`${MACHINE_NODE_TYPE}-${machine.name}`),
      ...machine,
      parent: null,
      children: [],
      internal: {
        type: MACHINE_NODE_TYPE,
        content: JSON.stringify(machine),
        contentDigest: createContentDigest(machine),
      },
    };
    createNode(node);
  });

  //   Create an array for the dates
  const dates = Object.keys(response.data.dates).map((date) => {
    //  Convert the date string to a date object
    const dateObj = new Date(date);

    return {
      date: date,
      dateObj: dateObj,
      xps: response.data.dates[date],
    };
  });

  // Create a node for each date
  dates.forEach((date) => {
    const node = {
      id: createNodeId(`${DATE_NODE_TYPE}-${date.date}`),
      ...date,
      parent: null,
      children: [],
      internal: {
        type: DATE_NODE_TYPE,
        content: JSON.stringify(date),
        contentDigest: createContentDigest(date),
      },
    };
    createNode(node);
  });

  //  Create a node for the user
  const user = {
    id: createNodeId(`${USER_NODE_TYPE}-${response.data.user}`),
    name: response.data.user,
    totalXp: response.data.total_xp,
    newXp: response.data.new_xp,
    languages: getNodesByType(LANGUAGE_NODE_TYPE),
    machines: getNodesByType(MACHINE_NODE_TYPE),
    dates: getNodesByType(DATE_NODE_TYPE),
    parent: null,
    children: [],
    internal: {
      type: USER_NODE_TYPE,
      content: JSON.stringify(response.data),
      contentDigest: createContentDigest(response.data),
    },
  };
  createNode(user);
};
