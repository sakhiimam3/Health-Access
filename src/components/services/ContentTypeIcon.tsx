import { FileText, ImageIcon, Video } from "lucide-react";

interface ContentTypeIconProps {
  type: string;
}

const ContentTypeIcon = ({ type }: ContentTypeIconProps) => {
  const iconProps = { className: "w-6 h-6 text-gray-500" };

  switch (type) {
    case "text":
    case "list":
      return <FileText {...iconProps} />;
    case "image":
      return <ImageIcon {...iconProps} />;
    case "video":
      return <Video {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

export default ContentTypeIcon; 