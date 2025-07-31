import type React from "react"
import { Video, ImageIcon } from "lucide-react"
import type { Column } from "@/lib/cms/cms-type"
import { useEffect, useState } from "react"

interface ColumnContentProps {
  column: Column
}

export const ColumnContent: React.FC<ColumnContentProps> = ({ column }) => {
  console.log("Column content:", column, typeof column.content, 
    column.content && typeof column.content === 'string' ? 
      (column.content.startsWith('{') ? 'JSON string' : 'URL string') : 
      (column.content && typeof column.content === 'object' ? 'Object with src: ' + (column.content.src || 'none') : 'Other'));

  // Helper function to parse content from string if needed
  const parseContent = (content: any) => {
    // If content is a string, try to parse it as JSON
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch (e) {
        // If it's not valid JSON but looks like a URL, treat it as an image/video src
        if (content.match(/^https?:\/\//) || content.match(/^\/[^/]/)) {
          return { src: content };
        }
        console.error("Failed to parse content:", e);
        return {};
      }
    }
    return content || {};
  };

  const [imageError, setImageError] = useState(false);
  
  // Image case handler
  const renderImage = () => {
    console.log("Rendering image with content:", column.content);
    
    // Get the image URL - could be a string directly or a JSON string
    let imageUrl = "";
    
    if (typeof column.content === 'string') {
      // Check if it's a JSON string
      if (column.content.startsWith('{')) {
        try {
          const parsed = JSON.parse(column.content);
          imageUrl = parsed.src || "";
        } catch (e) {
          // Not valid JSON, use as is
          imageUrl = column.content;
        }
      } else {
        // Direct URL
        imageUrl = column.content;
      }
    } else if (typeof column.content === 'object' && column.content !== null) {
      // For backward compatibility with old format
      imageUrl = column.content.src || "";
    }
    
    console.log("Final image URL:", imageUrl);

    // Check if it's a valid URL
    const isValidUrl = !!imageUrl && typeof imageUrl === 'string' && (
      imageUrl.startsWith('http://') || 
      imageUrl.startsWith('https://') || 
      imageUrl.startsWith('/') ||
      imageUrl.startsWith('blob:') ||
      imageUrl.match(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+/) // Matches simple domain patterns
    );

    if (!imageUrl || !isValidUrl) {
      // Show placeholder for missing images
      return (
        <div className="w-full h-[250px] bg-gray-200 rounded-lg flex flex-col items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">No image available</p>
        </div>
      );
    }

    // Valid image URL, display it
    return (
      <div className="relative w-full h-[250px]">
        <img
          src={imageUrl}
          alt="Image"
          className="w-full h-[250px] object-cover rounded-lg"
          onError={() => setImageError(true)}
        />
        {imageUrl.startsWith('blob:') && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
            Selected for upload
          </div>
        )}
      </div>
    );
  };

  // Text content handler
  const renderTextContent = () => {
    let textContent;
    
    try {
      // Try to parse as JSON if it's a string
      if (typeof column.content === 'string') {
        // Check if it's a JSON string
        if (column.content.startsWith('{')) {
          try {
            const parsed = JSON.parse(column.content);
            // Try to get description or title
            textContent = parsed.description || parsed.title || "";
          } catch (e) {
            // Not valid JSON, use as is
            textContent = column.content;
          }
        } else {
          // Plain text
          textContent = column.content;
        }
      } else if (typeof column.content === 'object' && column.content !== null) {
        // Object format - extract text content
        textContent = column.content.description || column.content.title || "";
      } else {
        textContent = "";
      }
      
      // If we have text content, display it
      if (textContent) {
        // Split into lines for better formatting
        const lines = textContent.split("\n");
        
        return (
          <div className="space-y-2 min-h-[100px]">
            {lines.map((line, index) => {
              return line.trim() ? (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {line}
                </p>
              ) : (
                <br key={index} />
              );
            })}
          </div>
        );
      }
      
      // Empty content
      return <p className="text-gray-600 min-h-[100px]">No content</p>;
    } catch (error) {
      console.error("Error rendering text content:", error);
      return <p className="text-gray-600 min-h-[100px]">Error displaying content</p>;
    }
  };

  // Video content handler
  const renderVideoContent = () => {
    console.log("Rendering video with content:", column.content);
    
    // Get the video URL - could be a string directly or a JSON string
    let videoUrl = "";
    
    if (typeof column.content === 'string') {
      // Check if it's a JSON string
      if (column.content.startsWith('{')) {
        try {
          const parsed = JSON.parse(column.content);
          videoUrl = parsed.src || "";
        } catch (e) {
          // Not valid JSON, use as is
          videoUrl = column.content;
        }
      } else {
        // Direct URL
        videoUrl = column.content;
      }
    } else if (typeof column.content === 'object' && column.content !== null) {
      // For backward compatibility with old format
      videoUrl = column.content.src || "";
    }
    
    console.log("Final video URL:", videoUrl);

    // Check if it's a valid URL
    const isValidUrl = !!videoUrl && typeof videoUrl === 'string' && (
      videoUrl.startsWith('http://') || 
      videoUrl.startsWith('https://') || 
      videoUrl.startsWith('/') ||
      videoUrl.startsWith('blob:')
    );

    if (!videoUrl || !isValidUrl) {
      // Show placeholder for missing videos
      return (
        <div className="w-full h-[250px] bg-gray-200 rounded-lg flex flex-col items-center justify-center">
          <Video className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">No video available</p>
        </div>
      );
    }

    // Valid video URL, display it
    return (
      <div className="relative w-full h-[250px]">
        <video controls className="w-full h-[250px] object-cover rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          <p>Your browser does not support HTML video.</p>
        </video>
        {videoUrl.startsWith('blob:') && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
            Selected for upload
          </div>
        )}
      </div>
    );
  };

  // Switch rendering based on column type
  switch (column.type) {
    case "text":
      return renderTextContent();

    case "image":
      if (imageError) {
        // Show placeholder if image fails to load
        return (
          <div className="space-y-2">
            <div className="w-full h-[250px] bg-gray-200 rounded-lg flex flex-col items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">Image failed to load</p>
            </div>
          </div>
        );
      }
      
      return (
        <div className="space-y-2">
          {renderImage()}
        </div>
      );

    case "video":
      return (
        <div className="space-y-2">
          {renderVideoContent()}
        </div>
      );

    case "list":
      const parsedListContent = parseContent(column.content);
      const listItems = typeof parsedListContent === 'object' && parsedListContent.items 
        ? parsedListContent.items 
        : [];
        
      return (
        <div className="space-y-2 min-h-[100px]">
          <ul className="list-disc list-inside space-y-1">
            {listItems.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return <div className="text-gray-400 min-h-[100px]">No content</div>
  }
}
