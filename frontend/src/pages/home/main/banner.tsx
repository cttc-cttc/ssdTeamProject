export default function Banner() {
  return (
    <div className="w-full h-100 bg-[#2c5536] flex items-center justify-center mb-8 gap-20">
      <div className="h-full">
        <img
          src="/images/home/banner_cafe.jpg"
          alt="banner_cafe"
          className="h-full object-contain"
        />
      </div>
      <div className="h-full">
        <img
          src="/images/home/banner_study.png"
          alt="banner_study"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
}
