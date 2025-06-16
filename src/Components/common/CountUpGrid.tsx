import CountUp from './CountUp';

export const CountUpGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 text-center">
      <div>
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={2}
          className="text-5xl font-bold text-white-600"
        />
        <p className="mt-2 text-lg text-gray-600">Clients</p>
      </div>

      <div>
        <CountUp
          from={0}
          to={250}
          separator=","
          direction="up"
          duration={1.5}
          className="text-5xl font-bold text-white-600"
        />
        <p className="mt-2 text-lg text-gray-600">Projects</p>
      </div>

      <div>
        <CountUp
          from={0}
          to={75}
          separator=","
          direction="up"
          duration={2}
          className="text-5xl font-bold text-white-600"
        />
        <p className="mt-2 text-lg text-gray-600">Recognitions</p>
      </div>
    </div>
  );
};
