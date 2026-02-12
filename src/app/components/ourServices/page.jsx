import React from "react";

import { v4 as uuidv4 } from "uuid";

const OurServices = () => {
  const OurservicesList = [
    {
      id: uuidv4(),
      path: "/OurServise-Images/Online Evaluation.webp",
      name: "Online Evaluation",
      details:
        "Answer simple question about your device and get an \n instant price estimate at checkout",
    },

    {
      id: uuidv4(),
      path: "/OurServise-Images/Delivery.webp",
      name: "Pick-up / Delivery",
      details: `At Pick-up / Delivery our technician will verify your used phone's functional & cosmetic condition`,
    },

    {
      id: uuidv4(),
      path: "/OurServise-Images/Device Exchange.webp",
      name: "Device Exchange",
      details:
        "Once the technician verifies your device, it will be seamlessly exchanged for the upgrade",
    },
  ];
  return (
    <div className="w-full flex items-center justify-center pt-10">
      <div className="w-full flex justify-between p-10">
        {OurservicesList.map((service) => (
          <div
            className="flex flex-col text-center items-center gap-3"
            key={service.id}
          >
            <img
              src={service.path}
              alt="Image is missing due to some Issue.."
              className="w-35"
            />
            <h4 className="text-[19px] font-semibold">{service.name}</h4>
            <p className="text-[#666666] text-[15px] whitespace-pre-line w-110">
              {service.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
