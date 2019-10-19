import React, { useCallback, useContext, useState, useEffect } from "react";
// import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";

import { useSelection } from "../select/context";
import SearchContext from "./context";

const appid = "ENR4KIKXXV";
const apikey = "bad8d0917512edb0b6cd99d7321c498e";
const searchClient = algoliasearch(appid, apikey);
const index = searchClient.initIndex("github_repos");

export default function SearchResults() {
  const [, setState] = useSelection();
  const [{ query, focus }, searchDispatch] = useContext(SearchContext);
  const [options, setOptions] = useState([]);

  const onClick = useCallback(
    repoName => {
      searchDispatch({
        type: "SELECT",
      });
      setState({
        type: "ADD",
        payload: repoName,
      });
    },
    [searchDispatch, setState]
  );

  useEffect(() => {
    if (query === "") setOptions([]);
    else
      index.search(
        {
          query,
        },
        (err, { hits }) => {
          if (err) throw err;
          setOptions(hits.slice(0, 5));
        }
      );
  }, [query]);

  return (
    <>
      {focus && query && options && (
        <div className="absolute w-100 bg-white bl br bb bw1 br2 br--bottom b--moon-gray">
          {options.map(opt => (
            <div
              key={opt.repo_name}
              onClick={() => onClick(opt.repo_name)}
              className="w-100 ph3 pv2"
            >
              <span className="f5">{opt.repo_name}</span>
              <br />
              <span className="f6">{opt.repo_url}</span>
            </div>
          ))}
          {query.length > 4 && options.length === 0 && (
            <div className="w-100 ph3 pv2">
              <span className="f5">No results found</span>
              <br />
              <span className="f6">Try a different search...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}