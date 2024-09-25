import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import styles from './index.module.css';
import { alpha, styled } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useSpring, animated } from '@react-spring/web';
import Collapse from '@mui/material/Collapse';
import { ArrowIcon, PlusSquare, CloseSquare } from './../../../../icons';
import paramsDefaultData from "../../../../../public/data/paramsDefaultData.json"
export default function RichObjectTreeView(props) {

  const [nodeCount, setNodeCount] = useState(3);

  const {
    treeData,
    setTreeData,
    nodeId,
    setNodeId,
  } = props;

  const increaseNodeCount = () => {
    // Convert the current nodeCount to a number, increment it, and then convert it back to a string
    const newCount = String(parseInt(nodeCount, 10) + 1);
    setNodeCount(newCount);
  }



  const handleAddChild = (nodeId, currentNode = null) => {
    setTreeData((prevData) => {
      const updatedData = prevData.map((node) => {
        if (node.id === nodeId) {
          // Add a new child when Add Child button is clicked
          const newChild = {
            id: `${nodeCount}`,
            name: `param-${nodeCount}`,
            data: paramsDefaultData,
            children: [],
          };
          increaseNodeCount();
          if (!node.children) {
            node.children = [];
          }
          // Make sure to return a new object for the modified node
          return {
            ...node,
            children: [...node.children, newChild],
          };
        } else if (node.children && node.children.length > 0) {
          // Recursively search in all children and add a child to the matching child
          const updatedChildren = recursiveAddChild(nodeId, node.children);
          if (updatedChildren) {
            return {
              ...node,
              children: updatedChildren,
            };
          }
        }
        return node;
      });
  
      return updatedData;
    });
  };
  
  // Helper function for recursion in the children array
  const recursiveAddChild = (nodeId, children) => {
    const updatedChildren = children.map((child) => {

      if(child.id === nodeId){
        const newChild = {
          id: `${nodeCount}`,
          name: `param-${nodeCount}`,
          data: paramsDefaultData,
          children: [],
        };
        increaseNodeCount();
        if (!child.children) {
          child.children = [];
        }
        return {
          ...child,
          children: [...child.children, newChild],
        };
      }else if (child.children && child.children.length > 0) {
        // Recursively search in all children and add a child to the matching child
        const updatedChildren = recursiveAddChild(nodeId, child.children);
        if (updatedChildren) {
          return {
            ...child,
            children: updatedChildren,
          };
        }
      }
      return child;
    });
  
    return updatedChildren;
  };

// Helper function for recursion in the children array
const recursiveRemoveChild = (nodeId, nodes) => {
  return nodes.filter((node) => {
    if (node.id === nodeId) {
      // If the node to be removed is found, filter it out
      return false;
    } else if (node.children && node.children.length > 0) {
      // Recursively search in all children and remove the matching child
      node.children = recursiveRemoveChild(nodeId, node.children);
      return true;
    }
    return true;
  });
};

const handleRemoveChild = (event, id) => {
  event.stopPropagation();

  if (id === treeData.at(0).id) {
    return;
  }

  if(id === nodeId){
    setNodeId("0");
  }

  setTreeData((prevData) => {
    const updatedData = recursiveRemoveChild(id, prevData);
    return updatedData;
  });
};

const handlePlusSquareClick = (event, nodeId) => {
  event.stopPropagation();
  handleAddChild(nodeId);
};

const handleNodeSelect = (event,nodeId) => {
  event.stopPropagation();
  setNodeId(nodeId)
};

const EndIcon = ({nodeId}) => {
  return(
    <div onClick={(event) => {handleRemoveChild(event,nodeId)}} className={styles.closeIcon}>
      <CloseSquare />
    </div>
  )
}
const PlusIcon = ({id}) => {
  return(
      <div className={styles.addIcon}  onClick={(event) => handlePlusSquareClick(event, id)}>
      {
        nodeId === id ? 
          <PlusSquare fill={"var(--primary)"} stroke={"var(--background-white)"}/> : <PlusSquare />
      }
    </div>
  )
}

const renderTree = (nodes) => (
  nodes.map((node) => (
    <StyledTreeItem
      onClick={(event) => handleNodeSelect(event,node.id)}
      key={node.id}
      nodeId={node.id}
      endIcon={<EndIcon nodeId={node.id} />}
      label={
        <div className={styles.labelBox}>
          <label>{node.name}</label>
          <PlusIcon id={node.id} />
        </div>
      }
    >
      {node.children && renderTree(node.children)}
    </StyledTreeItem>
  ))
);


  return (
    <div className={styles.box}>
      <TreeView
        aria-label="customized"
        defaultExpanded={['1']}
        defaultCollapseIcon={<ArrowIcon direction='down' />}
        defaultExpandIcon={<ArrowIcon direction='left' />}
      >
        {renderTree(treeData)}
      </TreeView>
    </div>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));


const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 24,
    paddingLeft: 16,
    borderLeft: `2px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.content} .${treeItemClasses.iconContainer}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    background: 'transparent',
  },
  [`& .${treeItemClasses.content}.${treeItemClasses.selected},
    & .${treeItemClasses.content}.${treeItemClasses.selected}.${treeItemClasses.focused}`]: {
    backgroundColor: 'var(--background-dark)',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },  
  [`& .${treeItemClasses.content}:not(.${treeItemClasses.selected}),
    & .${treeItemClasses.root}`]: {
    background: 'transparent',
  }
}));
