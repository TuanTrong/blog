import React from "react";
import { Link } from "react-router-dom";
import { randomBadgesClassname } from "../utils/randomString";

export function create(tags?: string[]): JSX.Element {
  return (
    <p className="btn-toolbar">
      {(tags || []).map(tag => (
        <Link to="/" className={`badge ${randomBadgesClassname()} mr-1`}>
          {tag}
        </Link>
      ))}
    </p>
  );
}
