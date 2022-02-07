import React, { Fragment, useEffect, useState } from "react";

import { CentralWhitePage } from "atoms/Container";
import PostList from "organisms/PostList";
import { BlogParallax } from "atoms/Parallax";

export default function Blogs() {
  return (
    <Fragment>
      <BlogParallax />
      <CentralWhitePage>
        <PostList />
      </CentralWhitePage>
    </Fragment>
  );
}
