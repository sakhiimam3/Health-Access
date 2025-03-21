import { User2Icon } from "lucide-react";
import Image from "next/image";
import {
  AccessibilityIcon,
  CommunityIcon,
  InnovationIcon,
  TransparencyIcon,
  TrustIcon,
} from "./icons/icons";

const coreValues = [
  {
    icon: <AccessibilityIcon />,
    title: "Accessibility",
    description:
      "Making pharmacy services available to everyone, wherever they are.",
  },
  {
    icon: <InnovationIcon />,
    title: "Innovation",
    description:
      "Leveraging technology to simplify and enhance the healthcare experience.",
  },
  {
    icon: <TransparencyIcon />,
    title: "Transparency",
    description:
      "Providing clear, upfront information about services, pricing, and availability.",
  },
  {
    icon: <TrustIcon />,
    title: "Trust",
    description:
      "Partnering with licensed pharmacists to ensure quality and reliability.",
  },
  {
    icon: <CommunityIcon />,
    title: "Community Impact",
    description:
      "Strengthening local pharmacies while improving public health.",
  },
];

const CoreValues = () => {
  return (
    <div className="">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center my-14">Core Values</h2>

      {/* Grid Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left: List of Core Values */}
        <div className="grid grid-cols-2 gap-6">
          {coreValues.map((value, index) => (
            <div key={index}>
              {value.icon}
              <div>
                <h3 className="text-xl font-semibold my-2">{value.title}</h3>
                <p className="text-[#52525B] font-roboto">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative group">
          {/* Image Thumbnail */}
          <Image
            src="/images/vedio-bg.png"
            alt="Pharmacist in a lab"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg w-full transition-transform duration-300 "
          />

          {/* Play Button Overlay */}
          <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl opacity-100 transition-opacity duration-300 group-hover:bg-opacity-50">
            <div className="bg-white p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-900"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
