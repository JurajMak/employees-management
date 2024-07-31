import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../Card';

const EmployeeCard: React.FC = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            Tekst
            <div className="flex flex-col space-y-1.5">Tekst</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>FOOTER</div>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
