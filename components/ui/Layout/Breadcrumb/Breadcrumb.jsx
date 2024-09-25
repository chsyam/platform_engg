import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router.js";

import { useState,useEffect } from "react";

export default function Breadcrumb() {

  const router = useRouter();
  const paths = router.asPath;
  let pathNames = paths.split("/").filter((path) => path);
  const original_pathNames = pathNames.slice();

  pathNames.map((path, index) => {
	  pathNames[index] = path.replace("_", " ");
    return pathNames[index];
  });

  if (router.query.hasOwnProperty("templateName")) {
    pathNames[pathNames.length - 1] = router.query["templateName"];
  } else if (router.query.hasOwnProperty("username")) {
    pathNames[pathNames.length - 1] = router.query["username"];
  } else if (router.query.hasOwnProperty("serviceName")) { 
    pathNames[pathNames.length - 1] = router.query["serviceName"];
	}
  
  const lowStyle = () => ({
    color: "gray",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textDecoration: "none",
  });

  const lastChild = ()=>({
    textDecoration:"none",
    fontSize:"18px",
    fontFamily:"Poppins",
    fontWeight:"600",
    color:"#000",
  })

  return (
    <Stack spacing={2} style={{width: "100%"}}>
      <div style={{ display: "inline-flex",backgroundColor:"white",padding:"15px",margin: "15px",borderRadius: "10px"}}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ backgroundColor: "var(--gray-background)" }}
        >
          <Link
            key="1"
            href={"/"}
            style={pathNames.length===0 ? lastChild() : lowStyle()}
          >
            Home
          </Link>
          
          {pathNames.slice(0,pathNames.length-1).map((link, index) => {
            let href = `/${original_pathNames.slice(0, index + 1).join("/")}`;
            return (
              <div key={index}>
                <Link
                  href= {href}
                  style={lowStyle()}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
                
                {pathNames.length !== index + 1}
              </div>
            );
          })}
          
          {pathNames.length > 0 && (
            <Link
              style={lastChild()}
            >
              {pathNames[pathNames.length - 1][0]?.toUpperCase()+pathNames[pathNames.length - 1].slice(1,)}
            </Link>
          )}
        </Breadcrumbs>
      </div>
    </Stack>
  );
}


