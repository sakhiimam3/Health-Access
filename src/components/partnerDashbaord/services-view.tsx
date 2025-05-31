import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ServicesView() {
  const sidebarServices = [
    "All Services",
    "Travel Vaccines",
    "Weight Management",
    "Pharmacy Jet Services",
    "Skin Boosters",
    "Dermal Fillers",
    "Lip Fillers",
    "Polynucleotides",
    "Anti Sweat Injections",
  ]

  const pharmacyServices = [
    "Vaccination Services",
    "Travel Vaccines",
    "Men's Health",
    "Weight Management",
    "Typhoid",
    "Rabies",
    "Women's Health",
    "Pharmacy Jet Services",
    "Cholera",
    "Other Services",
  ]

  const aestheticServices = [
    "Skin Boosters",
    "Dermal Fillers",
    "Lip Fillers",
    "Polynucleotides",
    "Anti Sweat Injections",
    "Anti-wrinkle face & neck injections",
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-0">
            <div className="space-y-1">
              <div className="p-4 border-b">
                <h3 className="font-ubuntu font-semibold text-teal-600">Services</h3>
              </div>
              {sidebarServices.map((service, index) => (
                <button
                  key={service}
                  className={`w-full text-left px-4 py-3 text-sm font-roboto transition-colors hover:bg-gray-50 ${
                    index === 0 ? "bg-gray-100 text-gray-900 border-r-2 border-teal-500" : "text-gray-600"
                  }`}
                >
                  {service}
                </button>
              ))}
              <div className="p-4">
                <Button className="w-full bg-teal-500 hover:bg-teal-600 font-roboto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">All Services</h1>

          {/* Pharmacy Services */}
          <div>
            <h2 className="text-lg font-ubuntu font-semibold text-gray-900 mb-4">Pharmacy Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pharmacyServices.map((service, index) => (
                <Button
                  key={service}
                  variant="outline"
                  className={`h-12 justify-center text-center font-roboto text-sm hover:bg-teal-50 hover:border-teal-200 ${
                    service === "Vaccination Services"
                      ? "border-teal-500 text-teal-600"
                      : service === "Travel Vaccines"
                        ? "border-teal-500 text-teal-600"
                        : service === "Men's Health"
                          ? "border-teal-500 text-teal-600"
                          : service === "Weight Management"
                            ? "border-teal-500 text-teal-600"
                            : service === "Typhoid"
                              ? "border-teal-500 text-teal-600"
                              : service === "Rabies"
                                ? "border-teal-500 text-teal-600"
                                : service === "Women's Health"
                                  ? "border-teal-500 text-teal-600"
                                  : service === "Pharmacy Jet Services"
                                    ? "border-teal-500 text-teal-600"
                                    : service === "Cholera"
                                      ? "border-teal-500 text-teal-600"
                                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          {/* Aesthetic Services */}
          <div>
            <h2 className="text-lg font-ubuntu font-semibold text-gray-900 mb-4">Aesthetic Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {aestheticServices.map((service) => (
                <Button
                  key={service}
                  variant="outline"
                  className="h-12 justify-center text-center font-roboto text-sm border-gray-300 text-gray-600 hover:bg-teal-50 hover:border-teal-200"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
