import React from "react";

import PropTypes from "prop-types";

export default function DeliveryTracker({
  trackerButtonRef,
  numberOfInvoice = "1231231",
}) {
  return (
    <form
      action="http://info.sweettracker.co.kr/tracking/5"
      method="post"
      style={{ display: "none" }}
    >
      <div className="form-group">
        <label htmlFor="t_key"></label>
        <input
          type="text"
          className="form-control"
          id="t_key"
          name="t_key"
          readOnly
          value={process.env.REACT_APP_DELIVERY_API_KEY}
        />
      </div>
      <div className="form-group">
        <label htmlFor="t_code"></label>
        <input
          type="text"
          className="form-control"
          id="t_code"
          name="t_code"
          value="01"
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="t_invoice"></label>
        <input
          type="text"
          className="form-control"
          id="t_invoice"
          name="t_invoice"
          readOnly
          value={numberOfInvoice}
        />
      </div>
      <button type="submit" ref={trackerButtonRef}>
        앗
      </button>
    </form>
  );
}

DeliveryTracker.propTypes = {
  trackerButtonRef: PropTypes.any,
  numberOfInvoice: PropTypes.string,
};
