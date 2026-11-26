"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.FaiscasAvatar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function FaiscasAvatar(_a) {
    var src = _a.src, alt = _a.alt, fallback = _a.fallback, _b = _a.sizeClass, sizeClass = _b === void 0 ? "w-11 h-11" : _b;
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        var animId;
        var anguloPortal = 0;
        var faiscas = [];
        var render = function () {
            var w = canvas.width;
            var h = canvas.height;
            var cx = w / 2;
            var cy = h / 2;
            var raio = w * 0.34;
            ctx.clearRect(0, 0, w, h);
            anguloPortal += 0.14;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(anguloPortal);
            ctx.beginPath();
            ctx.arc(0, 0, raio, 0, Math.PI * 1.65);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 2.5;
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.restore();
            for (var i = 0; i < 4; i++) {
                var theta = Math.random() * Math.PI * 2;
                var px = cx + Math.cos(theta) * raio;
                var py = cy + Math.sin(theta) * raio;
                var vel = 1.6 + Math.random() * 2.4;
                var vx = -Math.sin(theta) * vel + Math.cos(theta) * 0.65;
                var vy = Math.cos(theta) * vel + Math.sin(theta) * 0.65;
                faiscas.push({
                    x: px,
                    y: py,
                    vx: vx,
                    vy: vy,
                    vida: 0,
                    maxVida: 14 + Math.random() * 14,
                    tamanho: 1.2 + Math.random() * 1.4
                });
            }
            for (var i = faiscas.length - 1; i >= 0; i--) {
                var f = faiscas[i];
                var xAnt = f.x;
                var yAnt = f.y;
                f.x += f.vx;
                f.y += f.vy;
                f.vy += 0.05;
                f.vida++;
                var alpha = 1 - f.vida / f.maxVida;
                if (alpha <= 0) {
                    faiscas.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.moveTo(xAnt, yAnt);
                ctx.lineTo(f.x, f.y);
                ctx.strokeStyle = "rgba(255, 255, 255, ".concat(alpha, ")");
                ctx.lineWidth = f.tamanho;
                ctx.shadowColor = "#ffffff";
                ctx.shadowBlur = 8;
                ctx.stroke();
            }
            animId = requestAnimationFrame(render);
        };
        render();
        return function () { return cancelAnimationFrame(animId); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative inline-flex items-center justify-center shrink-0" }, { children: [(0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, width: 150, height: 150, className: "absolute pointer-events-none z-20", style: { width: "145%", height: "145%" } }), (0, jsx_runtime_1.jsx)("img", { src: src, alt: alt, onError: function (e) {
                    e.currentTarget.src = fallback;
                }, className: "".concat(sizeClass, " rounded-full object-cover border-2 border-white relative z-10 shadow-[0_0_16px_rgba(255,255,255,0.85)]") })] })));
}
exports.FaiscasAvatar = FaiscasAvatar;
