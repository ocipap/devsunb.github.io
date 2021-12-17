import { Link } from "@primer/components";
import React from "react";
import useThemeConfig from "../use-theme-config";

function LastUpdated({ blameUrl, lastUpdated }) {
  const primerWikiThemeConfig = useThemeConfig();
  const { lastUpdatedText, shouldShowLastUpdated } = primerWikiThemeConfig;
  if (!shouldShowLastUpdated) {
    return null;
  }
  return (
    <div>
      {lastUpdated ? (
        <Link href={blameUrl} fontSize={1} color="auto.gray.7" mt={1}>
          {lastUpdatedText} <b>{lastUpdated}</b>
        </Link>
      ) : null}
    </div>
  );
}

export default LastUpdated;
