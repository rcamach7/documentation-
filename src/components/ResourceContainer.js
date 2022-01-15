import React from "react";
import Resource from "./Resource";

export default class ResourceContainer extends React.Component {
  render() {
    return (
      <div className="ResourceContainer">
        {this.props.resources.map((resource, i) => {
          return (
            <Resource
              resource={resource}
              key={i}
              handleDeleteResource={this.props.handleDeleteResource}
              handleEditResource={this.props.handleEditResource}
            />
          );
        })}
      </div>
    );
  }
}
