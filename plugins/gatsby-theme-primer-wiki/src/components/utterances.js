import React from "react";

class Utterances extends React.Component {
  constructor(props) {
    super(props);
    this.commentsEl = React.createRef();
    this.state = { status: "pending" };
  }

  componentDidMount() {
    this.commentsEl.current.innerHTML = "";
    const scriptEl = document.createElement("script");
    scriptEl.onload = () => this.setState({ status: "success" });
    scriptEl.onerror = () => this.setState({ status: "failed" });
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.setAttribute("repo", "devsunb/devsunb.github.io-utterances");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", this.props.theme);
    scriptEl.setAttribute("crossorigin", "anonymous");
    this.commentsEl.current.appendChild(scriptEl);
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      const message = {
        type: "set-theme",
        theme: this.props.theme,
      };
      const utterances = document.querySelector("iframe").contentWindow;
      utterances.postMessage(message, "https://utteranc.es");
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div className="comments-wrapper">
        {status === "failed" && <div>Error. Please try again.</div>}
        {status === "pending" && <div>Loading script...</div>}
        <div ref={this.commentsEl} />
      </div>
    );
  }
}

export default Utterances;
