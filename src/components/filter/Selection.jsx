import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../redux/dataSlice";
const Selection = ({ selection }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectionName, setSelectionName] = useState("");

  const setSelection = async () => {
    if (selection.type == "Category") {
      const response = await axios.get(
        `${BASE_URL}/categories?id=${selection.value}`
      );
      let currentCategory = response.data[0];
      setSelectionName(currentCategory?.name);
    } else if (selection.type == "Brand") {
      const response = await axios.get(
        `${BASE_URL}/brands?id=${selection.value}`
      );
      let currentCategory = response.data[0];
      setSelectionName(currentCategory?.name);
    } else if (selection.type == "Query") {
      setSelectionName(selection?.value);
    }
  };
  const clearSelection = () => {
    if (selection.type == "Category") {
      const param = searchParams.get("categoryId");
      if (param) {
        searchParams.delete("categoryId");
        setSearchParams(searchParams);
      }
    } else if (selection.type == "Brand") {
      const param = searchParams.get("brandId");
      if (param) {
        searchParams.delete("brandId");
        setSearchParams(searchParams);
      }
    } else if (selection.type == "Query") {
      const param = searchParams.get("q");
      if (param) {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }
  };
  useEffect(() => {
    setSelection();
  }, [selection]);

  return (
    <div className="currentSelection">
      <div className="currentSelectionLeft">
        <span>
          <strong>{selection.type}: </strong>
        </span>
        <span>{selectionName}</span>
      </div>
      <div onClick={() => clearSelection()} className="button">
        X
      </div>
    </div>
  );
};

export default Selection;
