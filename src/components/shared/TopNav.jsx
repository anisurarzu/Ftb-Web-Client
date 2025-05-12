"use client";

import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

export default function TopNavbar() {
  return (
    <nav className="w-full bg-transparent text-teal-600 font-thin border-b-[1px] border-gray-400">
      <div className=" mx-[20px] flex items-center justify-end px-4 py-2">
        {/* Large Screen Layout */}
        <div className="hidden md:grid grid-cols-3 items-center gap-4 text-[8px] md:text-base font-inter">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="bg-white px-2 py-1 rounded-full">
              <MailOutlined className="text-[#52C0C2]" />
            </span>
            <span>fasttrackbookingbd@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            <span className="bg-white px-2 py-1 rounded-full">
              <PhoneOutlined className="text-[#52C0C2]" />
            </span>
            <span>+880 1898-841011, +880 1829-628295</span>
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            <span className="bg-white px-2 py-1 rounded-full">
              <EnvironmentOutlined className="text-[#52C0C2]" />
            </span>
            <span>{`  N.H.A Building No- 09, Kolatoli, Cox's Bazar, Bangladesh`}</span>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="w-full flex justify-center md:hidden gap-4">
          <Tooltip title="Email">
            <div className="flex items-center gap-2 text-xs relative group">
              <span className="bg-white px-[5px] py-[3px]  rounded-full cursor-pointer">
                <MailOutlined className="text-[#52C0C2]" />
              </span>
              <span className="hidden group-hover:inline-block bg-white p-1 rounded-md shadow-md text-black absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                fasttrackbookingbd@gmail.com
              </span>
            </div>
          </Tooltip>
          <Tooltip title="Phone">
            <div className="flex items-center gap-2 text-xs relative group">
              <span className="bg-white px-[5px] py-[3px] rounded-full cursor-pointer">
                <PhoneOutlined className="text-[#52C0C2]" />
              </span>
              <span className="hidden group-hover:inline-block bg-white p-1 rounded-md shadow-md text-black absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                +880 1898-841011, +880 1829-628295
              </span>
            </div>
          </Tooltip>
          <Tooltip title="Location">
            <div className="flex items-center gap-2 text-xs relative group">
              <span className="bg-white px-[5px] py-[3px]  rounded-full cursor-pointer">
                <EnvironmentOutlined className="text-[#52C0C2]" />
              </span>
              <span className="hidden group-hover:inline-block bg-white p-1 rounded-md shadow-md text-black absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {`  N.H.A Building No- 09, Kolatoli, Cox's Bazar, Bangladesh`}
              </span>
            </div>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
