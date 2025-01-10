import { Spinner } from "flowbite-react";

function SpinnerComponent() {
  return (
    <div className="flex flex-wrap justify-center items-center h-screen gap-2">

      <div className="text-right">
        <Spinner aria-label="Right-aligned spinner example" />
      </div>
    </div>
  );
}


export default SpinnerComponent