import React, { useState, useRef, useEffect } from 'react';

const StickyNote = ({ note, updateNote, removeNote }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const noteRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                updateNote(note.id, {
                    ...note,
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, note, updateNote]);

    const handleMouseDown = (e) => {
        if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - note.x,
                y: e.clientY - note.y,
            });
        }
    };

    return (
        <div
            className="sticky-note"
            ref={noteRef}
            style={{
                backgroundColor: note.color,
                top: note.y,
                left: note.x,
            }}
            onMouseDown={handleMouseDown}
        >
            <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, { ...note, content: e.target.value })}
            />
            <button onClick={() => removeNote(note.id)}>X</button>
        </div>
    );
};

export default StickyNote;
