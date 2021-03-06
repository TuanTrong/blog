import React from "react";
import { Link } from "react-router-dom";
import { getRandomBadgesClassname } from "../../utils/random";
import { ButtonToolbar } from "react-bootstrap";

export function create(tags?: string[]) {
  if (!tags || !tags.length) return null;
  return (
    <ButtonToolbar>
      {tags.map((tag: string, index: number) => (
        <Link
          key={index}
          to="/"
          className={`badge ${getRandomBadgesClassname()} mr-1`}
        >
          {tag}
        </Link>
      ))}
    </ButtonToolbar>
  );
}
