"use client";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { locations, bhk, bedrooms } from "@/data/location";
import axios from "axios";

export default function Home() {
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: locations[0],
  });
  const [price, setPrice] = useState<string>("( Predict to get the value )");

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    if (inputs.area == "" && inputs.bathrooms == "" && inputs.bedrooms == "") {
      setError("Please Enter All The Fields !");
    }
    e.preventDefault();
    await axios
      .post("http://localhost:5000/predict-price", inputs)
      .then((res) => {
        setPrice(res.data.predicted_price);
        setError("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="z-10 my-10 px-0 md:px-0 w-full md:w-[60%] mx-auto">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-4xl">
          HomePrice.<span className="text-violet-700">AI</span>
        </h1>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Predict Your Home Price Anywhere AnyTime",
            1000,
            "Your Intelligent Home Broker Assistant",
            1000,
          ]}
          wrapper="span"
          style={{ display: "inline-block" }}
          className="font-bold text-2xl lg:text-3xl w-[90%] md:w-[60%] text-center text-[#212263]"
          repeat={Infinity}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-2 mt-10 border-green-700 flex flex-col rounded-xl px-10 py-10 w-[90%] md:w-[60%] relative mx-auto"
      >
        <div className="flex flex-row flex-wrap justify-center gap-10 md:gap-12 items-center mx-auto">
          <InputField name="area" value={inputs.area} onChange={handleChange} />
          <SelectInput
            name="bedrooms"
            options={bedrooms}
            value={inputs.bedrooms}
            onChange={handleChange}
          />
          <SelectInput
            name="bathrooms"
            options={bhk}
            value={inputs.bathrooms}
            onChange={handleChange}
          />
          <SelectInput
            name="location"
            options={locations}
            value={inputs.location}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-700 mx-auto text-white rounded-lg w-full mt-10 md:w-[40%] font-semibold p-2"
        >
          Predict
        </button>
        <h1 className="text-xl text-red-700 text-center w-full font-semibold">
          {error !== "" && error}
        </h1>
        <h1 className="text-2xl w-full text-center font-semibold tracking-wide mt-10">
          Predicted Price:{" "}
          <span className="text-green-800 font-bold text-2xl">
            {typeof price == "number" && "Rs."} {price}{" "}
            {typeof price == "number" && "Lacs"}
          </span>
        </h1>
      </form>
    </div>
  );
}

const InputField = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col relative w-full md:w-[30%] items-start justify-start gap-1">
      <label
        htmlFor={name}
        className="font-semibold text-md md:text-xl tracking-tight"
      >
        Area {"In Sq. Ft."}
      </label>
      <input
        name={name}
        id={name}
        type="text"
        value={value}
        onChange={onChange}
        className="border-2 border-gray-500 rounded-lg w-full p-2"
        placeholder="Example:1000"
      />
    </div>
  );
};

const SelectInput = ({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-1 w-full md:w-[30%]">
        <label
          htmlFor={name}
          className="font-semibold text-md md:text-xl tracking-tight"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
        </label>
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="bg-white border border-gray-300 py-2 px-1 w-full text-gray-900 text-sm rounded-lg "
        >
          {options.map((option: any, index: number) => {
            return (
              <option value={option} key={index} className="text-black">
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
