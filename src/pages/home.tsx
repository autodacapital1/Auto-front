import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Bell, Menu } from "lucide-react";

export const Home = () => {

  return (
    <div className="bg-gray-100 min-h-screen min-w-screen ">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <div>
          <ul className="flex space-x-6">
            <Menu className="w-6 h-6 text-gray-700" />
            <li className="text-sm">Últimas Notícias</li>
            <li className="text-sm">Quem Somos</li>
            <li className="text-sm">About</li>
          </ul>
        </div>
        
        <h1 className="text-lg font-bold">NINGUÉM PERGUNTOU</h1>
        
        <div className="flex items-center space-x-4">
          <a href="" className="text-sm text-blue-500 hover:text-blue-700">Login</a>
          <Bell className="w-6 h-6 text-gray-700" />
        </div>
      </header>
      
      {/* Section Title */}
      <div className="bg-pink-600 text-white text-lg font-semibold p-3 mt-2">
        Distrito Federal
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Card>
                <img
                  src="/news1.jpg"
                  alt="news"
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="text-xs text-gray-500">02:26:52 AM</p>
                  <h2 className="text-lg font-bold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-sm text-gray-600">
                    In laoreet semper odio ut mollis. Suspendisse laoreet
                    ultricies ligula non eleifend.
                  </p>
                </div>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <Card>
          <CardContent className="flex gap-4 p-3">
            <img
              src="/news2.jpg"
              alt="news"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <p className="text-xs text-pink-600 font-semibold">Esfoça</p>
              <h3 className="text-md font-bold">Lorem ipsum dolor sit amet</h3>
              <p className="text-sm text-gray-600">
                In laoreet semper odio ut mollis. Suspendisse laoreet ultricies
                ligula non eleifend.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <h3 className="text-md font-bold text-pink-600">Novidades</h3>
            <ScrollArea className="h-32">
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="text-blue-600">Autor</span> - In malesuada est non elit varius.
                </p>
                <Separator />
                <p>
                  <span className="text-blue-600">Autor</span> - In malesuada est non elit varius.
                </p>
                <Separator />
                <p>
                  <span className="text-blue-600">Autor</span> - In malesuada est non elit varius.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
