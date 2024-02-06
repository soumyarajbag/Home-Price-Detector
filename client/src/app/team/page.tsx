"use client";
import { ThreeDCardDemo, teamData } from "@/components/TeamCard";
import React from "react";

const page = () => {
  return (
    <div className="my-10 md:max-w-[80%] mx-auto flex flex-col items-center">
      <h1 className="text-4xl text-violet-500 font-semibold tracking-wider ">
        Team :{" "}
        <span className="hover:text-orange-700 cursor-pointer">
          ML-A 
        </span>{" "}
      </h1>
      <div className="flex flex-wrap items-center md:gap-10 justify-center mx-auto ">
        {teamData.map((item, index) => {
          return (
            <ThreeDCardDemo
              key={index}
              name={item.name}
              image={item.image}
              role={item.role}
              linkedin={item.linkedin}
              github={item.github}
              instagram={item.instagram}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;