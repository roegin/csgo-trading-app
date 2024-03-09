import { Button } from "@/components/ui/button";
import '../styles/globals.css';

export default function Banner() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-5">
      <div 
        className="container space-y-12 px-4 md:px-6 py-36"
        style={{ backgroundImage: "url('/banner1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="grid gap-4 items-center lg:grid-cols-2 xl:gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl xl:text-6xl">大量盲盒优惠抽取</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Find the hottest deals, newly added products, and user recommendations.
            </p>
          </div>
          <div className="flex items-center justify-start space-x-4">
            <Button size="lg" variant="outline">
              查看更多
            </Button>
          </div>
        </div>
      </div>
      <div className="container space-y-12 px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 以下是产品区域的示例代码 */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

// 这是一个简单的产品卡片组件示例
function ProductCard() {
  return (
    <div className="flex flex-col gap-2">
      <img
        alt="Product"
        className="aspect-[16/9] object-cover rounded-lg overflow-hidden"
        height="300"
        src="/placeholder.svg"
        width="500"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium leading-none">Product Title</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Product description that might be two lines on mobile but can be longer on tablet and desktop.
        </p>
        <div className="flex items-center gap-1">
          <h4 className="text-sm font-medium">$29.00</h4>
          <Button size="sm">Buy</Button>
        </div>
      </div>
    </div>
  );
}
