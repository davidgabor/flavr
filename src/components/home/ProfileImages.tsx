const ProfileImages = () => {
  return (
    <div className="flex items-center justify-center -space-x-4">
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQGTbmpMLQualw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728313961873?e=1736985600&v=beta&t=-qTMspUk11IuzOzs_g4t5VXH0Jtamkd4Bayq4ZvaXQU"
            alt="David's profile"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQHA9ZPFYWC8nQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728372617118?e=1737590400&v=beta&t=_hPUlmpjsO-ksPTeiJt4nROwGfDNlN0Smj6VfyWE7mg"
            alt="Maja's profile"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImages;