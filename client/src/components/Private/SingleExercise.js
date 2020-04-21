  
import React from 'react';

export default function SingleExercise({reps, name}){
    return (
        <div className="grid grid-cols-6 gap-4 container mx-auto px-6 py-2">
            <span className="text-left font-light text-sm col-span-2">{name}</span>
            <span className="text-left font-light text-sm col-span-1">{reps[0]}</span>
            <span className="text-left font-light text-sm col-span-1">{reps[1]}</span>
            <span className="text-left font-light text-sm col-span-1">{reps[2]}</span>
            <span className="text-left font-light text-sm col-span-1">{reps[3]}</span>
        </div>
    )
}