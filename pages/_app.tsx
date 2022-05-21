import Head from "next/head";
import Script from "next/script";
import "tailwindcss/tailwind.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "../styles/global.css";
import "../styles/variables.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js" />
      <Script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js" />
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css"
      />
    </>
  );
}
export default MyApp;
