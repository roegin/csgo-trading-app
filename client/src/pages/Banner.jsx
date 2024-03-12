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
      <div className="container space-y-12 px-4 md:px-6 py-36"
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
      <div className="container space-y-12 px-4 md:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 使用数据生成广告模块 */}
        {ads.map((ad, index) => (
          <AdModule key={index} image={ad.image} title={ad.title} description={ad.description} />
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