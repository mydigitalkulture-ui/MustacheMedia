import React, { useState, useCallback, useRef, useEffect, useMemo, createContext, useContext } from 'react';
import {
    Zap,
    Globe,
    Bot,
    Plus,
    Cloud,
    Edit2,
    FileSpreadsheet,
    MessageCircle,
    Send
} from 'lucide-react';

const NODE_WIDTH = 84;
const NODE_HEIGHT = 84;

const COLORS = {
    bg: '#1e2125',
    grid: '#a3a3a3',
    nodeBg: '#2a2b2f',
    nodeBorder: '#4c4c54',
    textMain: '#f0f0f0',
    textSub: '#8b929a',
    edge: '#8a939e',
    port: '#dcdedf',
};

const INITIAL_NODES = [
    { id: 'trigger', type: 'trigger', title: 'Telegram Trigger', sub: 'Updates: message', icon: 'Send', position: { x: 100, y: 300 }, iconBg: '#21a6e5', iconColor: '#fff' },
    { id: 'search', type: 'action', title: 'Web Search', sub: 'GET: https://api.duckduckgo.c...', icon: 'Globe', position: { x: 350, y: 300 }, iconBg: '#6470f5', iconColor: '#fff' },
    { id: 'blog', type: 'action', title: 'Medium Blog', sub: 'complete: text', icon: 'Bot', position: { x: 600, y: 300 }, iconBg: '#35373d', iconColor: '#fff' },
    { id: 'drive', type: 'action', title: 'Save to Google Drive', sub: 'upload: file', icon: 'Cloud', position: { x: 880, y: 130 }, iconBg: '#35373d', iconColor: '#fbc02d' },
    { id: 'prepare', type: 'action', title: 'Prepare Data for Sheets', sub: '', icon: 'Edit2', position: { x: 880, y: 300 }, iconBg: '#35373d', iconColor: '#1a73e8' },
    { id: 'telegram', type: 'action', title: 'Send Telegram Message', sub: 'sendMessage: message', icon: 'Send', position: { x: 880, y: 470 }, iconBg: '#35373d', iconColor: '#21a6e5' },
    { id: 'sheets', type: 'action', title: 'Save to Google Sheets', sub: 'append: sheet', icon: 'FileSpreadsheet', position: { x: 1150, y: 300 }, iconBg: '#35373d', iconColor: '#0f9d58' },
];

const INITIAL_EDGES = [
    { id: 'e1', source: 'trigger', target: 'search' },
    { id: 'e2', source: 'search', target: 'blog' },
    { id: 'e3', source: 'blog', target: 'drive' },
    { id: 'e4', source: 'blog', target: 'prepare' },
    { id: 'e5', source: 'blog', target: 'telegram' },
    { id: 'e6', source: 'prepare', target: 'sheets' },
];

const IconMap = {
    Send,
    Globe,
    Bot,
    Cloud,
    Edit2,
    FileSpreadsheet,
    MessageCircle
};

export const FlickeringGrid = ({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    width,
    height,
    className,
    maxOpacity = 0.3,
    ...props
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const memoizedColor = useMemo(() => {
        const toRGBA = (color) => {
            if (typeof window === "undefined") {
                return `rgba(0, 0, 0,`;
            }
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext("2d");
            if (!ctx) return "rgba(255, 0, 0,";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
            return `rgba(${r}, ${g}, ${b},`;
        };
        return toRGBA(color);
    }, [color]);

    const setupCanvas = useCallback(
        (canvas, width, height) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const cols = Math.floor(width / (squareSize + gridGap));
            const rows = Math.floor(height / (squareSize + gridGap));

            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }

            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, maxOpacity]
    );

    const updateSquares = useCallback(
        (squares, deltaTime) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        },
        [flickerChance, maxOpacity]
    );

    const drawGrid = useCallback(
        (
            ctx,
            width,
            height,
            cols,
            rows,
            squares,
            dpr
        ) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j];
                    ctx.fillStyle = `${memoizedColor}${opacity})`;
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr
                    );
                }
            }
        },
        [memoizedColor, squareSize, gridGap]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;
        let gridParams;

        const updateCanvasSize = () => {
            const newWidth = width || container.clientWidth;
            const newHeight = height || container.clientHeight;
            setCanvasSize({ width: newWidth, height: newHeight });
            gridParams = setupCanvas(canvas, newWidth, newHeight);
        };

        updateCanvasSize();

        let lastTime = 0;
        const animate = (time) => {
            if (!isInView) return;

            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            updateSquares(gridParams.squares, deltaTime);
            drawGrid(
                ctx,
                canvas.width,
                canvas.height,
                gridParams.cols,
                gridParams.rows,
                gridParams.squares,
                gridParams.dpr
            );
            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });

        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        intersectionObserver.observe(canvas);

        if (isInView) {
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

    return (
        <div
            ref={containerRef}
            className={`h-full w-full ${className || ''}`}
            {...props}
        >
            <canvas
                ref={canvasRef}
                className="pointer-events-none"
                style={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                }}
            />
        </div>
    );
};

const MouseEnterContext = createContext();

export const CardContainer = ({ children, className, containerClassName }) => {
    const containerRef = useRef(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = () => setIsMouseEntered(true);

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={`py-4 flex items-center justify-center ${containerClassName || ""}`}
                style={{ perspective: "1000px" }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`flex items-center justify-center relative transition-all duration-200 ease-linear ${className || ""}`}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody = ({ children, className }) => {
    return (
        <div className={`h-auto w-auto max-w-relative [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] ${className || ""}`}>
            {children}
        </div>
    );
};

export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};

export const CardItem = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}) => {
    const ref = useRef(null);
    const [isMouseEntered] = useMouseEnter();

    useEffect(() => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        }
    }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

    return (
        <Tag ref={ref} className={`w-fit transition duration-200 ease-linear ${className || ""}`} {...rest}>
            {children}
        </Tag>
    );
};

export function ThreeDCardEffect() {
    return (
        <CardContainer className="inter-var" containerClassName="py-0">
            <CardBody className="bg-[#2a2b2f] relative overflow-hidden group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] border-[#4c4c54] w-[20rem] h-auto rounded-xl p-5 border shadow-2xl">

                {/* Embedded Masked Background */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        WebkitMaskImage: "radial-gradient(160px circle at center, white, transparent)",
                        maskImage: "radial-gradient(160px circle at center, white, transparent)"
                    }}
                >
                    <FlickeringGrid
                        squareSize={4}
                        gridGap={6}
                        color="#60A5FA"
                        maxOpacity={0.3}
                        flickerChance={0.1}
                    />
                </div>

                <div className="relative z-10">
                    <CardItem translateZ="50" className="text-lg font-bold text-[var(--text-primary)]">
                        Workflow Automation Engine
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="text-[#8b929a] text-xs max-w-sm mt-1.5 leading-snug">
                        Design, integrate, and deploy advanced multi-agent workflows in seconds. Seamlessly connect external APIs.
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop"
                            className="h-32 w-full object-cover rounded-lg shadow-black/40 shadow-lg group-hover/card:shadow-xl group-hover/card:shadow-blue-500/20"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <div className="flex justify-between items-center mt-6">
                        <CardItem translateZ={20} as="a" href="#" className="px-3 py-1.5 rounded-lg text-[11px] font-normal text-[var(--text-primary)] hover:text-blue-400 cursor-pointer transition-colors backdrop-blur-sm bg-white/5 border border-white/10">
                            View Documentation →
                        </CardItem>
                        <CardItem translateZ={20} as="button" className="px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-[var(--text-primary)] text-[11px] font-bold cursor-pointer transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                            Deploy Now
                        </CardItem>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
}

export default function Workflow() {
    const [nodes, setNodes] = useState(INITIAL_NODES);
    const [draggingNodeId, setDraggingNodeId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [pan, setPan] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const handlePointerDown = (e, nodeId) => {
        if (e.target.closest('.no-drag')) return;
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const actualX = e.clientX - containerRect.left - pan.x;
        const actualY = e.clientY - containerRect.top - pan.y;

        setDragOffset({
            x: actualX - node.position.x,
            y: actualY - node.position.y,
        });
        setDraggingNodeId(nodeId);

        setNodes(prev => {
            const filtered = prev.filter(n => n.id !== nodeId);
            return [...filtered, node];
        });
        e.stopPropagation();
    };

    const handlePointerMove = useCallback((e) => {
        if (!draggingNodeId || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        setNodes(prevNodes => prevNodes.map(node => {
            if (node.id === draggingNodeId) {
                const newX = (e.clientX - containerRect.left - pan.x) - dragOffset.x;
                const newY = (e.clientY - containerRect.top - pan.y) - dragOffset.y;
                return { ...node, position: { x: newX, y: newY } };
            }
            return node;
        }));
    }, [draggingNodeId, dragOffset, pan]);

    const handlePointerUp = useCallback(() => {
        setDraggingNodeId(null);
    }, []);

    useEffect(() => {
        if (draggingNodeId) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [draggingNodeId, handlePointerMove, handlePointerUp]);

    const getPortPosition = (node, type) => {
        if (type === 'output') {
            return { x: node.position.x + NODE_WIDTH + 5, y: node.position.y + (NODE_HEIGHT / 2) };
        } else {
            return { x: node.position.x - 5, y: node.position.y + (NODE_HEIGHT / 2) };
        }
    };

    const createBezierPath = (p1, p2) => {
        const offset = Math.max(Math.abs(p2.x - p1.x) * 0.45, 40);
        return `M ${p1.x} ${p1.y} C ${p1.x + offset} ${p1.y}, ${p2.x - offset} ${p2.y}, ${p2.x - 6} ${p2.y}`;
    };

    // Nodes with no outgoing edges
    const terminalNodeIds = nodes.filter(n => !INITIAL_EDGES.find(e => e.source === n.id)).map(n => n.id);

    return (
        <div className="w-full h-screen overflow-hidden select-none"
            style={{ backgroundColor: COLORS.bg, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div
                ref={containerRef}
                className="relative w-full h-full cursor-grab active:cursor-grabbing"
                style={{ left: 100, top: 80 }}
                onPointerDown={(e) => {
                    // Start panning if clicking empty space
                    if (e.target === containerRef.current || e.target.classList.contains('canvas-bg')) {
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const initialPan = { ...pan };
                        const onMove = (moveEvent) => {
                            setPan({
                                x: initialPan.x + (moveEvent.clientX - startX),
                                y: initialPan.y + (moveEvent.clientY - startY)
                            });
                        };
                        const onUp = () => {
                            window.removeEventListener('pointermove', onMove);
                            window.removeEventListener('pointerup', onUp);
                        };
                        window.addEventListener('pointermove', onMove);
                        window.addEventListener('pointerup', onUp);
                    }
                }}
            >
                <div
                    className="absolute inset-0 origin-top-left canvas-bg"
                    style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
                >
                    {/* Native n8n Style Background Grid Pattern (infinite effect) */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
                        style={{
                            backgroundImage: `radial-gradient(${COLORS.grid} 1px, transparent 1px)`,
                            backgroundSize: '24px 24px',
                            width: '4000vw',
                            height: '4000vh',
                            left: `-2000vw`,
                            top: `-2000vh`,
                        }}
                    />

                    {/* The 3D Hover Card sitting as part of the canvas */}
                    <div
                        className="absolute z-20 pointer-events-auto"
                        style={{ left: 100, top: -60 }}
                    >
                        <ThreeDCardEffect />
                    </div>

                    {/* CSS Animation for data transmission */}
                    <style>{`
                        @keyframes data-flow {
                            from { stroke-dashoffset: 30; }
                            to { stroke-dashoffset: 0; }
                        }
                    `}</style>

                    {/* SVG Connector Lines Layer */}
                    <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={COLORS.edge} />
                            </marker>
                        </defs>
                        {INITIAL_EDGES.map(edge => {
                            const sourceNode = nodes.find(n => n.id === edge.source);
                            const targetNode = nodes.find(n => n.id === edge.target);
                            if (!sourceNode || !targetNode) return null;

                            const p1 = getPortPosition(sourceNode, 'output');
                            const p2 = getPortPosition(targetNode, 'input');
                            const path = createBezierPath(p1, p2);

                            return (
                                <g key={edge.id}>
                                    {/* Base Line */}
                                    <path
                                        d={path}
                                        fill="none"
                                        stroke={COLORS.edge}
                                        strokeWidth="2.5"
                                        markerEnd="url(#arrow)"
                                    />
                                    {/* Animated Transmission Overlay */}
                                    <path
                                        d={path}
                                        fill="none"
                                        stroke="#1ea0d8"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray="6 24"
                                        style={{
                                            animation: 'data-flow 1s linear infinite',
                                            filter: 'drop-shadow(0 0 4px rgba(30, 160, 216, 0.4))'
                                        }}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Nodes Layer */}
                    {nodes.map(node => {
                        const Icon = IconMap[node.icon];
                        const isTerminal = terminalNodeIds.includes(node.id);

                        return (
                            <div
                                key={node.id}
                                className="absolute z-10 flex flex-col items-center"
                                style={{
                                    left: node.position.x,
                                    top: node.position.y,
                                    width: NODE_WIDTH,
                                    cursor: draggingNodeId === node.id ? 'grabbing' : 'pointer',
                                    zIndex: draggingNodeId === node.id ? 50 : 10
                                }}
                                onPointerDown={(e) => handlePointerDown(e, node.id)}
                            >
                                {/* The lightning indicator for trigger */}
                                {node.type === 'trigger' && (
                                    <div className="absolute -left-6 top-[34px] text-red-500">
                                        <Zap size={16} color="#ff6b6b" fill="#ff6b6b" />
                                    </div>
                                )}

                                {/* Main Rounded Square Box */}
                                <div
                                    className="relative flex items-center justify-center rounded-2xl border transition-colors hover:border-[#6b7280]"
                                    style={{
                                        width: NODE_WIDTH,
                                        height: NODE_HEIGHT,
                                        backgroundColor: COLORS.nodeBg,
                                        borderColor: COLORS.nodeBorder,
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                                    }}
                                >
                                    {/* Icon Circle */}
                                    <div
                                        className="flex items-center justify-center rounded-full"
                                        style={{
                                            width: 44,
                                            height: 44,
                                            backgroundColor: node.iconBg,
                                            color: node.iconColor
                                        }}
                                    >
                                        <Icon size={22} strokeWidth={2.5} />
                                    </div>

                                    {/* Left Input Port */}
                                    {node.type !== 'trigger' && (
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 rounded-full border border-gray-500 bg-[#35373d] flex items-center justify-center"
                                            style={{ width: 10, height: 10, left: -5 }}
                                        >
                                            <div className="rounded-full bg-[#a3a3a3]" style={{ width: 4, height: 4 }} />
                                        </div>
                                    )}

                                    {/* Right Output Port */}
                                    {!isTerminal && (
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 rounded-full border border-gray-500 bg-[#35373d] flex items-center justify-center"
                                            style={{ width: 10, height: 10, right: -5 }}
                                        >
                                            <div className="rounded-full bg-[#a3a3a3]" style={{ width: 4, height: 4 }} />
                                        </div>
                                    )}
                                </div>

                                {/* Terminal + Button Line */}
                                {isTerminal && (
                                    <div className="absolute top-[42px] -translate-y-1/2 flex items-center" style={{ left: NODE_WIDTH }}>
                                        <div className="h-[2px] w-4" style={{ backgroundColor: COLORS.edge }} />
                                        <div className="flex items-center justify-center rounded-[3px] border border-gray-600 bg-[#2a2b2f] hover:bg-[#35373d] cursor-pointer" style={{ width: 15, height: 15 }}>
                                            <Plus size={10} color="#dcdedf" />
                                        </div>
                                    </div>
                                )}

                                {/* Labels below box */}
                                <div className="mt-2 text-center" style={{ width: NODE_WIDTH * 1.8 }}>
                                    <div className="font-medium text-[13px] truncate text-[var(--text-primary)]">{node.title}</div>
                                    {node.sub && (
                                        <div className="text-[11px] truncate mt-0.5 leading-tight" style={{ color: COLORS.textSub }}>{node.sub}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}