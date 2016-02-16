// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    Meteor.call("setChecked", this.props.task._id, !this.props.task.checked);
  },

  deleteThisTask() {
    Meteor.call("removeTask", this.props.task._id);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  render() {
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return (
      <li className={taskClassName}>
        { this.props.task.owner === Meteor.userId() ? (
          <button className="delete" onClick={this.deleteThisTask}>
          &times;
          </button>
        ) : '' }

        { this.props.task.owner === Meteor.userId() ? (
          <input
            type="checkbox"
            readOnly={true}
            checked={this.props.task.checked}
            onClick={this.toggleChecked} />
          ) : '' }

          { this.props.showPrivateButton ? (
            <button className="toggle-private" onClick={this.togglePrivate}>
              { this.props.task.private ? "Private" : "Public" }
            </button>
          ) : '' }

          <span className="text">
            <strong>{this.props.task.username}</strong>: {this.props.task.text}
          </span>
      </li>
    )
  }
});
