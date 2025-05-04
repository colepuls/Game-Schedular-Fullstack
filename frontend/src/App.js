import ScheduleGameForm from './ScheduleGameForm';
import AssignTeamsForm from './AssignTeamsForm';
import RecordPerformanceForm from './RecordPerformanceForm';
import GameStats from './GameStats';

export default function App() {
  return (
    <div className="mx-auto max-w-lg p-8 text-center">
      {/* Main page title */}
      <h1 className="mb-8 text-3xl font-bold tracking-wide text-blue-700">
        Game Admin
      </h1>

      {/* Schedule Game section */}
      <h2 className="mt-10 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
        <span className="inline-block h-px w-6 bg-gray-300" />
        <span>Schedule New Game</span>
        <span className="inline-block h-px w-6 bg-gray-300" />
      </h2>
      <ScheduleGameForm />

      {/* Assign Teams section */}
      <h2 className="mt-10 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
        <span className="inline-block h-px w-6 bg-gray-300" />
        <span>Assign Teams</span>
        <span className="inline-block h-px w-6 bg-gray-300" />
      </h2>
      <AssignTeamsForm />

      {/* Record Performance section */}
      <h2 className="mt-10 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
        <span className="inline-block h-px w-6 bg-gray-300" />
        <span>Record Player Performance</span>
        <span className="inline-block h-px w-6 bg-gray-300" />
      </h2>
      <RecordPerformanceForm />

      {/* Display Stats section */}
      <h2 className="mt-10 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">
        <span className="inline-block h-px w-6 bg-gray-300" />
        <span>Display Game Stats</span>
        <span className="inline-block h-px w-6 bg-gray-300" />
      </h2>
      <GameStats />
    </div>
  );
}
