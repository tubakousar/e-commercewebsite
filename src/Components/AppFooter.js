import { Typography } from "antd";
import React from "react";

function AppFooter() {
  return (
    <div className="appfooter">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>

      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms and Condition
      </Typography.Link>

      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      
      <Typography.Link href="tel: +123456789" target={"_blank"}>
        +123456789
      </Typography.Link>
    </div>
  );
}

export default AppFooter;
