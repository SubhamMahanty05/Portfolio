import { motion } from "framer-motion";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

function RadarChartComponent({ data, onSelectSkill }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_34px_rgba(15,23,42,0.4)] backdrop-blur-2xl"
    >
      <div className="mb-4">
        <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Skills Overview</div>
        <div className="mt-2 text-2xl font-semibold text-white">Capability Radar</div>
      </div>

      <div className="h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="68%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Radar
              name="Skill Level"
              dataKey="value"
              stroke="#22d3ee"
              fill="rgba(34,211,238,0.24)"
              fillOpacity={1}
              onMouseMove={(state) => {
                if (state?.activePayload?.[0]?.payload?.skill) {
                  onSelectSkill(state.activePayload[0].payload.skill);
                }
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default RadarChartComponent;
