import { Button } from "@/components/ui/button";
import '../styles/globals.css';
import { Card, CardTitle, CardDescription, CardHeader, CardContent,CardFooter } from '@/components/ui/card';

export default function Banner() {
    // 三个广告的数据，可以根据需要从服务器获取或者定义在其他地方
    const ads = [
      {
        image: '/sb-1.jpg',
        title: 'Epic Loot Awaits! Grab a Blind Box and get ready for surprises that will elevate your game',
        description: 'Discover the Rare and the Legendary! Every box is a chance to win items that turn heads in-game.',
      },
      {
        image: '/sb-2.jpg',
        title: 'Epic Loot Awaits! Grab a Blind Box and get ready for surprises that will elevate your game',
        description: 'Discover the Rare and the Legendary! Every box is a chance to win items that turn heads in-game.',
      },
      {
        image: '/sb-3.jpg',
        title: 'Epic Loot Awaits! Grab a Blind Box and get ready for surprises that will elevate your game',
        description: 'Discover the Rare and the Legendary! Every box is a chance to win items that turn heads in-game.',
      },
      // ...其他广告数据
    ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-5">
      <div 
        className="container space-y-12 px-4 md:px-6 py-36"
        style={{ backgroundImage: "url('/banner.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="grid gap-4 items-center lg:grid-cols-2 xl:gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl xl:text-6xl">Unlock the Unknown! Dive into our Mystery Boxes for a chance to discover exclusive in-game treasures.</h1>
            <p className="text-gray-500 dark:text-gray-400">
            Epic Loot Awaits! Grab a Blind Box and get ready for surprises that will elevate your game..
            </p>
          </div>
          <div className="flex items-center justify-start space-x-4">
            <Button size="lg" variant="outline">
              More
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto space-y-12 px-4 md:px-6">
        {/* Cards container with flex display */}
        <div className="flex flex-wrap justify-center gap-4">
          {ads.map((ad, index) => (
            <Card key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  alt="Ad"
                  className="w-full"
                  src={ad.image}
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <CardContent className="px-6 py-4">
                    <CardTitle className="font-bold text-xl mb-2 text-white">{ad.title}</CardTitle>
                    <p className="text-gray-300 text-base">{ad.description}</p>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="px-6 pt-4 pb-2">
                <Button className="text-sm bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-700 hover:text-white">了解更多</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// 修改AdModule组件以接受数据作为参数
function AdModule({ image, title, description }) {
  return (
    <div className="flex flex-col gap-2">
      <img
        alt="Ad"
        className="aspect-[16/9] object-cover rounded-lg overflow-hidden"
        height="300"
        src={image}
        width="500"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium leading-none">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <Button size="sm">Learn More</Button>
      </div>
    </div>
  );
}