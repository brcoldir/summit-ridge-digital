import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ArrowIcon } from "../components/Icon";

export function NotFound() {
  return (
    <Layout
      title="Page Not Found | Summit Ridge Digital"
      description="The requested Summit Ridge Digital page could not be found."
    >
      <section className="not-found">
        <span>404</span>
        <h1>Wrong trail. Right agency.</h1>
        <p>That page moved or never existed.</p>
        <Link className="button primary" to="/">
          {"Back to basecamp "}
          <ArrowIcon />
        </Link>
      </section>
    </Layout>
  );
}
