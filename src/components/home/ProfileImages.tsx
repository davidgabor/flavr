const ProfileImages = () => {
  return (
    <div className="flex items-center justify-center -space-x-3">
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <img
            src="https://i.ibb.co/bmLZkMb/David-Heyra-1177-HIGH-Square-copy.jpg"
            alt="David's profile"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <img
            src="https://i.ibb.co/SKvdbgg/Heyra-1251-HIGH.jpg"
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