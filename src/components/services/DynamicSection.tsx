import Image from "next/image";
import ContentTypeIcon from "./ContentTypeIcon";

interface ServiceSection {
  id: string;
  layout:
    | "one_column"
    | "two_column"
    | "three_column"
    | "two_by_two_column"
    | "three_by_three_column";
  title: string;
  columns: Array<{
    id: string;
    type: "text" | "image" | "video" | "list";
    content: string;
    columnOrder: number;
  }>;
}

interface DynamicSectionProps {
  section: ServiceSection;
}

const renderParsedContent = (content: string) => {
  try {
    return JSON.parse(content);
  } catch (error) {
    return content;
  }
};

const DynamicSection = ({ section }: DynamicSectionProps) => {
  const isOneColumn = section.layout === "one_column";

  const getGridClasses = () => {
    switch (section.layout) {
      case "two_column":
        return "lg:grid-cols-2";
      case "three_column":
        return "lg:grid-cols-3";
      case "two_by_two_column":
        return "grid-cols-1 sm:grid-cols-2";
      case "three_by_three_column":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <section className="py-8 px-2 lg:px-4">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {section.title}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#189BA3] to-[#14a085] mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div
          className={`grid gap-8 lg:gap-2 ${getGridClasses()} ${
            isOneColumn ? "mx-auto max-w-4xl" : ""
          }`}
        >
          {section.columns
            .sort((a, b) => a.columnOrder - b.columnOrder)
            .map((column) => (
              <div
                key={column.id}
                className={`group transition-all duration-300 ${
                  isOneColumn ? "text-center" : ""
                } ${column.content === "" ? "opacity-60" : ""}`}
              >
                <div className="p-6 lg:p-8">
                  {column.type === "text" && (
                    <div className="prose prose-lg lg:prose-xl max-w-none">
                      <div
                        className="text-gray-700 leading-relaxed text-lg lg:text-xl"
                        dangerouslySetInnerHTML={{
                          __html: renderParsedContent(column.content),
                        }}
                      />
                    </div>
                  )}

                  {column.type === "image" && column.content && (
                    <div className="relative aspect-video rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out shadow-lg">
                      <Image
                        src={column.content || "/images/notfound.jpg"}
                        alt={section.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}

                  {column.type === "video" && column.content && (
                    <div className="relative rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-lg">
                      <video
                        src={column.content}
                        controls
                        className="w-full aspect-video rounded-xl"
                        poster="/placeholder.svg?height=400&width=600"
                      />
                    </div>
                  )}

                  {column.type === "list" && (
                    <div className="prose prose-lg lg:prose-xl max-w-none">
                      <div
                        className="text-gray-700 leading-relaxed text-lg lg:text-xl"
                        dangerouslySetInnerHTML={{
                          __html: renderParsedContent(column.content),
                        }}
                      />
                    </div>
                  )}

                  {column.content === "" && (
                    <div className="flex items-center justify-center h-48 text-gray-400 border border-gray-200 rounded-xl">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                          <ContentTypeIcon type={column.type} />
                        </div>
                        <p className="text-base font-medium">No content available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicSection; 