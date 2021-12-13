import React, { useRef, useEffect } from "react";
import { NoteGraphView, NoteGraphModel } from "note-graph";
import { navigate } from "gatsby";
import { useGraphData } from "../use-note-graph-data";
import { useWindowSize } from "../use-window-size";
import { Box } from "@primer/components";
import { Modal } from "react-overlays";
import styled from "styled-components";
import { useTheme } from "@primer/components";

const RESULTS_WIDTH = 0;
const Backdrop = styled("div")`
  position: fixed;
  z-index: 98;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const renderBackdrop = (props) => <Backdrop {...props} />;
const StyledModal = styled(Modal)`
  z-index: 98;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default function GraphView({
  setIsOpen,
  isOpen,
  currentSlug,
  tagsGroups,
}) {
  const { notesMap } = useGraphData(tagsGroups);
  const windowSize = useWindowSize();
  const graphContainer = useRef(null);
  const notes = Array.from(notesMap.values());
  const theme = useTheme();
  const colorMode = theme.resolvedColorMode;

  useEffect(() => {
    if (!graphContainer.current || !isOpen) {
      return;
    }

    const graphModel = new NoteGraphModel(notes);
    const modalSize = {
      width: Math.min(windowSize.width - 40, 1400),
      height: Math.min(windowSize.height - 150, 800),
    };
    const dayStyle = {
      background: '#f7f7f7',
      highlightedForeground: '#f9c74f',
      node: {
        note: {
          regular: '#0366d6',
        },
      },
      link: {
        regular: '#d0d3d8',
        highlighted: '#f9c74f',
        lessened: '#d0d3d8',
      },
      hoverNodeLink: {
        highlightedDirection: {
          inbound: '#0366d6',
          outbound: '#f9c74f',
        },
      },
    }
    const nightStyle = {
      background: '#0e1117',
      highlightedForeground: '#f9c74f',
      node: {
        note: {
          regular: '#58a6ff',
        },
      },
      link: {
        regular: '#595F69',
        highlighted: '#f9c74f',
        lessened: '#595F69',
      },
      hoverNodeLink: {
        highlightedDirection: {
          inbound: '#58a6ff',
          outbound: '#f9c74f',
        },
      },
    }
    const noteGraphView = new NoteGraphView({
      container: graphContainer.current,
      graphModel,
      width: modalSize.width - RESULTS_WIDTH,
      height: modalSize.height,
      style: colorMode === "night" ? nightStyle : dayStyle,
    });

    noteGraphView.onInteraction("nodeClick", ({ node }) => {
      if (node.url) {
        navigate(node.url);
      }
    });

    if (currentSlug) {
      const currentNoteInfo = graphModel.getNodeInfoById(currentSlug);
      const shouldZoomToFit =
        currentNoteInfo && Boolean(currentNoteInfo.neighbors?.length);
      noteGraphView.setSelectedNodes([currentSlug], { shouldZoomToFit });
    }

    return () => {
      noteGraphView.dispose();
    };
  }, [notes, isOpen, currentSlug, windowSize]);
  if (!isOpen) {
    return null;
  }

  return (
    <StyledModal
      show={isOpen}
      onHide={(e) => {
        setIsOpen(false);
      }}
      renderBackdrop={renderBackdrop}
      aria-labelledby="modal-label"
    >
      <div ref={graphContainer} id="graph-container"></div>
    </StyledModal>
  );
}
