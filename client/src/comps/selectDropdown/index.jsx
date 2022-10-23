import React, { useEffect, useState } from "react";
import "./style.css";

const SelectDropdown = ({ options, onChange, id }) => (
  <select className="select" onChange={onChange}>
    {options.map((o, i) => (
      <option key={i} selected={id == o.value ? "selected" : ""} value={o.value}>{o.name}</option>
    ))}
  </select>
);

export default SelectDropdown;
