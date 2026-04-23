import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Search, Users, PhoneCall, Phone, Target, Timer, Rocket, Globe2, MapPinned, Package, UserPlus, TrendingUp, AlertTriangle } from "lucide-react";

const regionOptions = ["Nacional", "Quito", "Guayaquil", "Quito + Guayaquil"];
const productWindowOptions = ["Marzo-Abril"];

const operationalKpis = {
  total_calls: 25966,
  unique_clients: 4804,
  completed_calls: 14913,
  contact_rate: 0.5743279673419086,
  direct_contact_calls: 3552,
  direct_contact_rate: 0.13679426942925363,
  interested_calls: 280,
  sales_calls: 190,
  avg_call_duration_sec: 47.89983054763922,
  avg_ring_duration_sec: 23.765045200172192,
  avg_talk_duration_sec: 28.18166164442531,
};

const operationalDaily = [
  { fecha: "2026-02-02", llamadas: 24, completadas: 7, contacto_directo: 0, contactabilidad: 0.2916666666666667, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-03", llamadas: 174, completadas: 80, contacto_directo: 0, contactabilidad: 0.45977011494252873, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-04", llamadas: 226, completadas: 69, contacto_directo: 0, contactabilidad: 0.3053097345132743, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-05", llamadas: 453, completadas: 179, contacto_directo: 0, contactabilidad: 0.39514348785871964, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-06", llamadas: 377, completadas: 133, contacto_directo: 0, contactabilidad: 0.35278514588859416, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-09", llamadas: 330, completadas: 104, contacto_directo: 0, contactabilidad: 0.3151515151515151, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-10", llamadas: 343, completadas: 137, contacto_directo: 0, contactabilidad: 0.39941690962099125, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-11", llamadas: 227, completadas: 86, contacto_directo: 0, contactabilidad: 0.3788546255506608, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-12", llamadas: 362, completadas: 112, contacto_directo: 0, contactabilidad: 0.30939226519337015, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-13", llamadas: 445, completadas: 201, contacto_directo: 0, contactabilidad: 0.45168539325842695, tasa_contacto_directo: 0.0 },
  { fecha: "2026-02-18", llamadas: 330, completadas: 131, contacto_directo: 56, contactabilidad: 0.396969696969697, tasa_contacto_directo: 0.1696969696969697 },
  { fecha: "2026-02-19", llamadas: 228, completadas: 72, contacto_directo: 46, contactabilidad: 0.3157894736842105, tasa_contacto_directo: 0.20175438596491227 },
  { fecha: "2026-02-20", llamadas: 550, completadas: 247, contacto_directo: 87, contactabilidad: 0.4490909090909091, tasa_contacto_directo: 0.15818181818181817 },
  { fecha: "2026-02-23", llamadas: 392, completadas: 180, contacto_directo: 65, contactabilidad: 0.45918367346938777, tasa_contacto_directo: 0.16581632653061223 },
  { fecha: "2026-02-24", llamadas: 357, completadas: 140, contacto_directo: 74, contactabilidad: 0.39215686274509803, tasa_contacto_directo: 0.20728291316526612 },
  { fecha: "2026-02-25", llamadas: 303, completadas: 152, contacto_directo: 47, contactabilidad: 0.5016501650165016, tasa_contacto_directo: 0.1551155115511551 },
  { fecha: "2026-02-26", llamadas: 409, completadas: 227, contacto_directo: 71, contactabilidad: 0.5550122249388753, tasa_contacto_directo: 0.17359413202933985 },
  { fecha: "2026-02-27", llamadas: 586, completadas: 372, contacto_directo: 79, contactabilidad: 0.6348122866894198, tasa_contacto_directo: 0.1348122866894198 },
  { fecha: "2026-03-02", llamadas: 343, completadas: 156, contacto_directo: 27, contactabilidad: 0.45481049562682213, tasa_contacto_directo: 0.07871720116618076 },
  { fecha: "2026-03-03", llamadas: 423, completadas: 329, contacto_directo: 115, contactabilidad: 0.7777777777777778, tasa_contacto_directo: 0.2718676122931442 },
  { fecha: "2026-03-04", llamadas: 359, completadas: 148, contacto_directo: 38, contactabilidad: 0.41225626740947074, tasa_contacto_directo: 0.10584958217270195 },
  { fecha: "2026-03-05", llamadas: 434, completadas: 197, contacto_directo: 49, contactabilidad: 0.45391705069124424, tasa_contacto_directo: 0.11290322580645161 },
  { fecha: "2026-03-06", llamadas: 281, completadas: 163, contacto_directo: 40, contactabilidad: 0.5800711743772242, tasa_contacto_directo: 0.1423487544483986 },
  { fecha: "2026-03-09", llamadas: 485, completadas: 325, contacto_directo: 49, contactabilidad: 0.6701030927835051, tasa_contacto_directo: 0.10103092783505155 },
  { fecha: "2026-03-10", llamadas: 604, completadas: 481, contacto_directo: 122, contactabilidad: 0.7963576158940397, tasa_contacto_directo: 0.20198675496688742 },
  { fecha: "2026-03-11", llamadas: 661, completadas: 356, contacto_directo: 100, contactabilidad: 0.5385779122533594, tasa_contacto_directo: 0.15128593040847202 },
  { fecha: "2026-03-12", llamadas: 514, completadas: 288, contacto_directo: 78, contactabilidad: 0.5603112840466926, tasa_contacto_directo: 0.1517509727626459 },
  { fecha: "2026-03-13", llamadas: 806, completadas: 548, contacto_directo: 125, contactabilidad: 0.6799007444168734, tasa_contacto_directo: 0.15508684863523572 },
  { fecha: "2026-03-16", llamadas: 543, completadas: 367, contacto_directo: 72, contactabilidad: 0.6758747697974218, tasa_contacto_directo: 0.13259668508287293 },
  { fecha: "2026-03-17", llamadas: 624, completadas: 343, contacto_directo: 92, contactabilidad: 0.5496794871794872, tasa_contacto_directo: 0.14743589743589744 },
  { fecha: "2026-03-18", llamadas: 399, completadas: 193, contacto_directo: 39, contactabilidad: 0.48370927318295737, tasa_contacto_directo: 0.09774436090225563 },
  { fecha: "2026-03-19", llamadas: 395, completadas: 291, contacto_directo: 56, contactabilidad: 0.7367088607594937, tasa_contacto_directo: 0.14177215189873418 },
  { fecha: "2026-03-20", llamadas: 247, completadas: 200, contacto_directo: 33, contactabilidad: 0.8097165991902834, tasa_contacto_directo: 0.13360323886639677 },
  { fecha: "2026-03-23", llamadas: 503, completadas: 325, contacto_directo: 68, contactabilidad: 0.6461232604373758, tasa_contacto_directo: 0.13518886679920477 },
  { fecha: "2026-03-24", llamadas: 469, completadas: 283, contacto_directo: 84, contactabilidad: 0.6034115138592751, tasa_contacto_directo: 0.1791044776119403 },
  { fecha: "2026-03-25", llamadas: 328, completadas: 179, contacto_directo: 52, contactabilidad: 0.5457317073170732, tasa_contacto_directo: 0.15853658536585366 },
  { fecha: "2026-03-26", llamadas: 493, completadas: 290, contacto_directo: 78, contactabilidad: 0.5882352941176471, tasa_contacto_directo: 0.15821501014198782 },
  { fecha: "2026-03-27", llamadas: 397, completadas: 299, contacto_directo: 85, contactabilidad: 0.7531486146095718, tasa_contacto_directo: 0.21410579345088162 },
  { fecha: "2026-03-30", llamadas: 425, completadas: 216, contacto_directo: 54, contactabilidad: 0.508235294117647, tasa_contacto_directo: 0.12705882352941175 },
  { fecha: "2026-03-31", llamadas: 474, completadas: 213, contacto_directo: 56, contactabilidad: 0.44936708860759494, tasa_contacto_directo: 0.11814345991561181 },
  { fecha: "2026-04-01", llamadas: 357, completadas: 135, contacto_directo: 36, contactabilidad: 0.37815126050420167, tasa_contacto_directo: 0.10084033613445378 },
  { fecha: "2026-04-02", llamadas: 625, completadas: 312, contacto_directo: 77, contactabilidad: 0.4992, tasa_contacto_directo: 0.1232 },
  { fecha: "2026-04-06", llamadas: 625, completadas: 300, contacto_directo: 68, contactabilidad: 0.48, tasa_contacto_directo: 0.1088 },
  { fecha: "2026-04-07", llamadas: 898, completadas: 573, contacto_directo: 113, contactabilidad: 0.6380846325167038, tasa_contacto_directo: 0.12583518930957683 },
  { fecha: "2026-04-08", llamadas: 509, completadas: 289, contacto_directo: 63, contactabilidad: 0.5677799607072692, tasa_contacto_directo: 0.1237721021611002 },
  { fecha: "2026-04-09", llamadas: 718, completadas: 458, contacto_directo: 102, contactabilidad: 0.637883008356546, tasa_contacto_directo: 0.14206128133704735 },
  { fecha: "2026-04-10", llamadas: 735, completadas: 494, contacto_directo: 132, contactabilidad: 0.6721088435374149, tasa_contacto_directo: 0.17959183673469387 },
  { fecha: "2026-04-13", llamadas: 577, completadas: 345, contacto_directo: 80, contactabilidad: 0.5979202772963605, tasa_contacto_directo: 0.1386481802426343 },
  { fecha: "2026-04-14", llamadas: 645, completadas: 416, contacto_directo: 112, contactabilidad: 0.6449612403100775, tasa_contacto_directo: 0.17364341085271318 },
  { fecha: "2026-04-15", llamadas: 607, completadas: 345, contacto_directo: 85, contactabilidad: 0.5683690280065898, tasa_contacto_directo: 0.14003294942324767 },
  { fecha: "2026-04-16", llamadas: 785, completadas: 535, contacto_directo: 162, contactabilidad: 0.6815286624203821, tasa_contacto_directo: 0.20636942675159236 },
  { fecha: "2026-04-17", llamadas: 876, completadas: 683, contacto_directo: 167, contactabilidad: 0.7796803652968036, tasa_contacto_directo: 0.1906392694063927 },
  { fecha: "2026-04-20", llamadas: 829, completadas: 578, contacto_directo: 147, contactabilidad: 0.6972255729794934, tasa_contacto_directo: 0.1773220747889023 },
  { fecha: "2026-04-21", llamadas: 857, completadas: 631, contacto_directo: 171, contactabilidad: 0.7362893815635939, tasa_contacto_directo: 0.19953325554259044 },
];

const operationalStatus = [
  { estatus: "SIN TIPIFICAR", llamadas: 10743 },
  { estatus: "T2-NC-BUZÓN DE VOZ", llamadas: 4227 },
  { estatus: "T2-NC-SIN RESPUESTA", llamadas: 3482 },
  { estatus: "T2-C-CONTACTO DIRECTO", llamadas: 3224 },
  { estatus: "NO CONTESTA", llamadas: 967 },
  { estatus: "BUZÓN DE VOZ", llamadas: 684 },
  { estatus: "T2-C-EQUIVOCADO", llamadas: 492 },
  { estatus: "T2-C-CIERRA LA LLAMADA", llamadas: 376 },
];

const operationalAgents = [
  { Agente: "CINDI ARELLANO", region: "Quito", llamadas: 835, clientes: 676, completadas: 768, contacto_directo: 85, contactabilidad: 0.9197604790419162, tasa_contacto_directo: 0.10179640718562874, duracion_promedio: 40.776047904191614, timbre_promedio: 23.102564102564102, conversacion_promedio: 43.88034188034188 },
  { Agente: "DOMINIQUE MOSQUERA", region: "Guayaquil", llamadas: 8596, clientes: 2833, completadas: 2722, contacto_directo: 3, contactabilidad: 0.31665891112145184, tasa_contacto_directo: 0.0003489995346672871, duracion_promedio: 50.24592833876221, timbre_promedio: 23.042931688804554, conversacion_promedio: 31.421015180265655 },
  { Agente: "ELIZABETH CARRERA", region: "Quito", llamadas: 10641, clientes: 2531, completadas: 6737, contacto_directo: 1995, contactabilidad: 0.6331171882341885, tasa_contacto_directo: 0.1874823794756132, duracion_promedio: 48.11023400056386, timbre_promedio: 24.9373576309795, conversacion_promedio: 25.80159453302961 },
  { Agente: "JENNIFER LEDESMA", region: "Guayaquil", llamadas: 5894, clientes: 2975, completadas: 4686, contacto_directo: 1469, contactabilidad: 0.7950458092975907, tasa_contacto_directo: 0.24923651170682048, duracion_promedio: 45.10756701730573, timbre_promedio: 23.065006915629322, conversacion_promedio: 26.437067773167357 },
];

const summaryByRegion = {
  Nacional: { marchTvClients: 236, aprilTvClients: 327, marAprTvClients: 500, aprilVsMarchGrowth: 0.38559322033898313, twoMonthVsMonthOneGrowth: 1.1186440677966103, marchImpactedSalesGrowth: 0.14027426467889903, marchTotalBuyerGrowth: 0.06838987614431868, marchCommercialBuyerGrowth: -0.004846526655896577, marAprTotalBuyerGrowth: -0.04244482173174868, note: "Fórmula: compradores con Pedido Tipo Autor = Televenta dentro del universo con match de cliente." },
  Quito: { marchTvClients: 207, aprilTvClients: 161, marAprTvClients: 314, aprilVsMarchGrowth: -0.2222222222222222, twoMonthVsMonthOneGrowth: 0.5169082125603865, marchImpactedSalesGrowth: 0.1776366411390482, marchTotalBuyerGrowth: 0.14243759177679882, marchCommercialBuyerGrowth: -0.029368575624082238, marAprTotalBuyerGrowth: -0.006535947712418277, note: "Regional tomada desde la base de ventas." },
  Guayaquil: { marchTvClients: 17, aprilTvClients: 45, marAprTvClients: 53, aprilVsMarchGrowth: 1.6470588235294117, twoMonthVsMonthOneGrowth: 2.1176470588235294, marchImpactedSalesGrowth: -0.0948667722001858, marchTotalBuyerGrowth: -0.07784431137724546, marchCommercialBuyerGrowth: -0.10778443113772451, marAprTotalBuyerGrowth: -0.12182741116751272, note: "Regional tomada desde la base de ventas." },
  "Quito + Guayaquil": { marchTvClients: 224, aprilTvClients: 206, marAprTvClients: 367, aprilVsMarchGrowth: -0.0803571428571429, twoMonthVsMonthOneGrowth: 0.6383928571428572, marchImpactedSalesGrowth: 0.14027426467889903, marchTotalBuyerGrowth: 0.06995073891625614, marchCommercialBuyerGrowth: -0.05517241379310345, marAprTotalBuyerGrowth: -0.041158536585365835, note: "Corte filtrado a REGIONAL in [Quito, Guayaquil]." },
};

const rolloutByRegion = {
  Nacional: [{ etapa: "Mar 2026", tv_clientes: 236, compradores_totales: 1984 }, { etapa: "Abr 2026", tv_clientes: 327, compradores_totales: 1180 }, { etapa: "Mar-Abr 2026", tv_clientes: 500, compradores_totales: 2256 }],
  Quito: [{ etapa: "Mar 2026", tv_clientes: 207, compradores_totales: 778 }, { etapa: "Abr 2026", tv_clientes: 161, compradores_totales: 492 }, { etapa: "Mar-Abr 2026", tv_clientes: 314, compradores_totales: 912 }],
  Guayaquil: [{ etapa: "Mar 2026", tv_clientes: 17, compradores_totales: 308 }, { etapa: "Abr 2026", tv_clientes: 45, compradores_totales: 164 }, { etapa: "Mar-Abr 2026", tv_clientes: 53, compradores_totales: 346 }],
  "Quito + Guayaquil": [{ etapa: "Mar 2026", tv_clientes: 224, compradores_totales: 1086 }, { etapa: "Abr 2026", tv_clientes: 206, compradores_totales: 656 }, { etapa: "Mar-Abr 2026", tv_clientes: 367, compradores_totales: 1258 }],
};

const yoyBuyersByRegion = {
  Nacional: [{ corte: "Mar 2025", comercial_clientes: 1857, televenta_clientes: 0 }, { corte: "Mar 2026", comercial_clientes: 1848, televenta_clientes: 236 }, { corte: "Mar-Abr 2025", comercial_clientes: 2356, televenta_clientes: 0 }, { corte: "Mar-Abr 2026", comercial_clientes: 2054, televenta_clientes: 500 }],
  Quito: [{ corte: "Mar 2025", comercial_clientes: 681, televenta_clientes: 0 }, { corte: "Mar 2026", comercial_clientes: 661, televenta_clientes: 207 }, { corte: "Mar-Abr 2025", comercial_clientes: 918, televenta_clientes: 0 }, { corte: "Mar-Abr 2026", comercial_clientes: 831, televenta_clientes: 314 }],
  Guayaquil: [{ corte: "Mar 2025", comercial_clientes: 334, televenta_clientes: 0 }, { corte: "Mar 2026", comercial_clientes: 298, televenta_clientes: 17 }, { corte: "Mar-Abr 2025", comercial_clientes: 394, televenta_clientes: 0 }, { corte: "Mar-Abr 2026", comercial_clientes: 344, televenta_clientes: 53 }],
  "Quito + Guayaquil": [{ corte: "Mar 2025", comercial_clientes: 1015, televenta_clientes: 0 }, { corte: "Mar 2026", comercial_clientes: 959, televenta_clientes: 224 }, { corte: "Mar-Abr 2025", comercial_clientes: 1312, televenta_clientes: 0 }, { corte: "Mar-Abr 2026", comercial_clientes: 1175, televenta_clientes: 367 }],
};

const impactSalesByRegion = {
  Nacional: { mar2025: 58955.3495, mar2026: 67225.2678, growth: 0.14027426467889903 },
  Quito: { mar2025: 50872.1041, mar2026: 59908.8538, growth: 0.1776366411390482 },
  Guayaquil: { mar2025: 8083.2454, mar2026: 7316.4140, growth: -0.0948667722001858 },
  "Quito + Guayaquil": { mar2025: 58955.3495, mar2026: 67225.2678, growth: 0.14027426467889903 },
};

const monthlyImpactByRegion = {
  Nacional: [{ mes: "ene", comercial: 83206.6767, televenta: 5322.7466, total: 88529.4233, mix_televenta: 0.06012404013931942 }, { mes: "feb", comercial: 47792.9074, televenta: 18681.9874, total: 66474.8948, mix_televenta: 0.2810382394166647 }, { mes: "mar", comercial: 51226.7379, televenta: 15998.5299, total: 67225.2678, mix_televenta: 0.23798387754433015 }, { mes: "abr", comercial: 26861.6099, televenta: 10275.1831, total: 37136.7930, mix_televenta: 0.27668471803690753 }],
  Quito: [{ mes: "ene", comercial: 75289.3677, televenta: 5322.7466, total: 80612.1143, mix_televenta: 0.06602911542787805 }, { mes: "feb", comercial: 40280.7207, televenta: 18681.9874, total: 58962.7081, mix_televenta: 0.3168441206654821 }, { mes: "mar", comercial: 46466.0478, televenta: 13442.8060, total: 59908.8538, mix_televenta: 0.22438763467045336 }, { mes: "abr", comercial: 22301.7618, televenta: 9548.5345, total: 31850.2963, mix_televenta: 0.299794212589476 }],
  Guayaquil: [{ mes: "ene", comercial: 7917.3090, televenta: 0.0, total: 7917.3090, mix_televenta: 0.0 }, { mes: "feb", comercial: 7512.1867, televenta: 0.0, total: 7512.1867, mix_televenta: 0.0 }, { mes: "mar", comercial: 4760.6901, televenta: 2555.7239, total: 7316.4140, mix_televenta: 0.3493137348433263 }, { mes: "abr", comercial: 4559.8481, televenta: 726.6486, total: 5286.4967, mix_televenta: 0.1374537129664717 }],
  "Quito + Guayaquil": [{ mes: "ene", comercial: 83206.6767, televenta: 5322.7466, total: 88529.4233, mix_televenta: 0.06012404013931942 }, { mes: "feb", comercial: 47792.9074, televenta: 18681.9874, total: 66474.8948, mix_televenta: 0.2810382394166647 }, { mes: "mar", comercial: 51226.7379, televenta: 15998.5299, total: 67225.2678, mix_televenta: 0.23798387754433015 }, { mes: "abr", comercial: 26861.6099, televenta: 10275.1831, total: 37136.7930, mix_televenta: 0.27668471803690753 }],
};

const productImpactByRegion = {
  "Nacional": { cohort_size: 500, buyers_2025: 305, buyers_2026: 479, avg_products_2025: 1.73, avg_products_2026: 2.282, product_client_pairs_2025: 865, product_client_pairs_2026: 1141, growth_avg_products: 0.3190751445086706, growth_buyers_avg: -0.16008785161765227 },
  "Quito": { cohort_size: 314, buyers_2025: 180, buyers_2026: 301, avg_products_2025: 1.3312101910828025, avg_products_2026: 1.910828025477707, product_client_pairs_2025: 418, product_client_pairs_2026: 600, growth_avg_products: 0.43540669856459346, growth_buyers_avg: -0.14161725667233627 },
  "Guayaquil": { cohort_size: 53, buyers_2025: 35, buyers_2026: 51, avg_products_2025: 3.3773584905660377, avg_products_2026: 3.7358490566037736, product_client_pairs_2025: 179, product_client_pairs_2026: 198, growth_avg_products: 0.1061452513966481, growth_buyers_avg: -0.24088070982582976 },
  "Quito + Guayaquil": { cohort_size: 367, buyers_2025: 215, buyers_2026: 352, avg_products_2025: 1.6267029972752043, avg_products_2026: 2.1743869209809263, product_client_pairs_2025: 597, product_client_pairs_2026: 798, growth_avg_products: 0.33668341708542715, growth_buyers_avg: -0.18355984467793507 },
};

const newClientsByRegion = {
  Nacional: { marzo_nuevos: 19, abril_nuevos: 15, marabr_nuevos: 39, participacion_marzo: 0.08050847457627118, participacion_marabr: 0.078 },
  Quito: { marzo_nuevos: 14, abril_nuevos: 9, marabr_nuevos: 24, participacion_marzo: 0.06763285024154589, participacion_marabr: 0.07643312101910828 },
  Guayaquil: { marzo_nuevos: 1, abril_nuevos: 2, marabr_nuevos: 3, participacion_marzo: 0.058823529411764705, participacion_marabr: 0.05660377358490566 },
  "Quito + Guayaquil": { marzo_nuevos: 15, abril_nuevos: 11, marabr_nuevos: 27, participacion_marzo: 0.06696428571428571, participacion_marabr: 0.07356948228882834 },
};

const topClients = [
  { Cliente: 600142717, negocio: "PANADERIA SPIN SPAN", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ5", llamadas: 7, venta_televenta_2026: 4229.82, venta_comercial_2026: 148.4874, venta_total_2026: 4378.3074, productos_tv: 2, productos_total: 4, es_nuevo_tv: false, contactabilidad: 0.42857142857142855 },
  { Cliente: 600155883, negocio: "JEHOVA PROVEERA", regional: "Guayaquil", agente_top: "DOMINIQUE MOSQUERA", ruta: "EGO", llamadas: 6, venta_televenta_2026: 2484.6891, venta_comercial_2026: 5422.0415, venta_total_2026: 7906.7306, productos_tv: 26, productos_total: 36, es_nuevo_tv: false, contactabilidad: 0.8333333333333334 },
  { Cliente: 600150344, negocio: "DELI AMBATO", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ2", llamadas: 17, venta_televenta_2026: 1879.92, venta_comercial_2026: 2667.7599, venta_total_2026: 4547.6799, productos_tv: 2, productos_total: 15, es_nuevo_tv: false, contactabilidad: 0.35294117647058826 },
  { Cliente: 600176773, negocio: "PANADERIA JESSICA", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ5", llamadas: 2, venta_televenta_2026: 1503.936, venta_comercial_2026: 3155.5851, venta_total_2026: 4659.5211, productos_tv: 2, productos_total: 2, es_nuevo_tv: false, contactabilidad: 0.5 },
  { Cliente: 600162957, negocio: "PANADERIA Y PASTELERIA EL TRIANG", regional: "Quito", agente_top: "JENNIFER LEDESMA", ruta: "EQ9", llamadas: 7, venta_televenta_2026: 1425.0285, venta_comercial_2026: 21.7379, venta_total_2026: 1446.7664, productos_tv: 2, productos_total: 3, es_nuevo_tv: false, contactabilidad: 0.8571428571428571 },
  { Cliente: 1000008734, negocio: "PANADERIA Y PASTELERIA DULCE ESP", regional: "Quito", agente_top: "JENNIFER LEDESMA", ruta: "EQ9", llamadas: 7, venta_televenta_2026: 1425.0284, venta_comercial_2026: 1472.625, venta_total_2026: 2897.6534, productos_tv: 2, productos_total: 2, es_nuevo_tv: false, contactabilidad: 0.5714285714285714 },
  { Cliente: 600162795, negocio: "PANADERIA Y PASTELERIA LETRIGAL", regional: "Quito", agente_top: "JENNIFER LEDESMA", ruta: "EQ9", llamadas: 11, venta_televenta_2026: 1425.0284, venta_comercial_2026: 91.5, venta_total_2026: 1516.5284, productos_tv: 2, productos_total: 3, es_nuevo_tv: false, contactabilidad: 0.6363636363636364 },
  { Cliente: 600148804, negocio: "PASTELERIA", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ2", llamadas: 14, venta_televenta_2026: 1283.5759, venta_comercial_2026: 0, venta_total_2026: 1283.5759, productos_tv: 2, productos_total: 2, es_nuevo_tv: false, contactabilidad: 0.5 },
  { Cliente: 600181367, negocio: "RINCON REPOSTERO", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ5", llamadas: 5, venta_televenta_2026: 1252.1077, venta_comercial_2026: 301.8979, venta_total_2026: 1554.0056, productos_tv: 4, productos_total: 10, es_nuevo_tv: false, contactabilidad: 0.8 },
  { Cliente: 600150171, negocio: "PANADERIA Y PASTELERIA CAMIPAN", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ2", llamadas: 11, venta_televenta_2026: 965.0076, venta_comercial_2026: 0, venta_total_2026: 965.0076, productos_tv: 2, productos_total: 2, es_nuevo_tv: false, contactabilidad: 0.8181818181818182 },
  { Cliente: 600142336, negocio: "PANADERIA COMAPAN", regional: "Quito", agente_top: "DOMINIQUE MOSQUERA", ruta: "EQ1", llamadas: 12, venta_televenta_2026: 949.2, venta_comercial_2026: 61.9541, venta_total_2026: 1011.1541, productos_tv: 1, productos_total: 4, es_nuevo_tv: false, contactabilidad: 0.6666666666666666 },
  { Cliente: 600148800, negocio: "PANADERIA ISAAC", regional: "Quito", agente_top: "ELIZABETH CARRERA", ruta: "EQ5", llamadas: 12, venta_televenta_2026: 939.96, venta_comercial_2026: 37.8241, venta_total_2026: 977.7841, productos_tv: 2, productos_total: 4, es_nuevo_tv: false, contactabilidad: 0.4166666666666667 },
];

const fmtInt = (n) => new Intl.NumberFormat("es-EC", { maximumFractionDigits: 0 }).format(Number(n) || 0);
const fmtPct = (n) => `${((Number(n) || 0) * 100).toFixed(1)}%`;
const fmtSec = (n) => `${Math.round(Number(n) || 0)} s`;
const fmtUsd = (n) => new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n) || 0);
const shortDate = (d) => d.slice(5);

function KpiCard({ title, value, sub, icon: Icon }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-900 mt-1">{value}</p>
            <p className="text-xs text-slate-500 mt-2 leading-5">{sub}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 shrink-0"><Icon className="h-5 w-5 text-slate-700" /></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardTeleventaHTML() {
  const [tab, setTab] = useState("operacion");
  const [regionFilter, setRegionFilter] = useState("Nacional");
  const [agentFilter, setAgentFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [productWindow, setProductWindow] = useState("Marzo-Abril");

  const summary = summaryByRegion[regionFilter] || summaryByRegion.Nacional;
  const rollout = rolloutByRegion[regionFilter] || rolloutByRegion.Nacional;
  const yoyBuyers = yoyBuyersByRegion[regionFilter] || yoyBuyersByRegion.Nacional;
  const impactSales = impactSalesByRegion[regionFilter] || impactSalesByRegion.Nacional;
  const monthlyImpact = monthlyImpactByRegion[regionFilter] || monthlyImpactByRegion.Nacional;
  const newClients = newClientsByRegion[regionFilter] || newClientsByRegion.Nacional;
  const productImpact = productImpactByRegion[regionFilter] || productImpactByRegion.Nacional;
  const productImpactChart = [
    { periodo: "Mar-Abr 2025", promedio: productImpact.avg_products_2025, compradores: productImpact.buyers_2025, combinaciones: productImpact.product_client_pairs_2025 },
    { periodo: "Mar-Abr 2026", promedio: productImpact.avg_products_2026, compradores: productImpact.buyers_2026, combinaciones: productImpact.product_client_pairs_2026 },
  ];

  const regionOpsAgents = useMemo(() => {
    if (regionFilter === "Nacional" || regionFilter === "Quito + Guayaquil") return operationalAgents;
    return operationalAgents.filter((a) => a.region === regionFilter);
  }, [regionFilter]);

  const agentOptions = useMemo(() => ["Todos", ...regionOpsAgents.map((a) => a.Agente)], [regionOpsAgents]);

  const filteredOpsAgents = useMemo(() => {
    if (agentFilter === "Todos") return regionOpsAgents;
    return regionOpsAgents.filter((a) => a.Agente === agentFilter);
  }, [agentFilter, regionOpsAgents]);

  const scopedOperational = useMemo(() => {
    const rows = filteredOpsAgents;
    const totalCalls = rows.reduce((acc, r) => acc + r.llamadas, 0);
    const totalCompleted = rows.reduce((acc, r) => acc + r.completadas, 0);
    const totalDirect = rows.reduce((acc, r) => acc + r.contacto_directo, 0);
    const totalClients = rows.reduce((acc, r) => acc + r.clientes, 0);
    const weighted = (key) => totalCalls ? rows.reduce((acc, r) => acc + r[key] * r.llamadas, 0) / totalCalls : 0;
    return {
      total_calls: totalCalls,
      unique_clients: totalClients,
      completed_calls: totalCompleted,
      contact_rate: totalCalls ? totalCompleted / totalCalls : 0,
      direct_contact_calls: totalDirect,
      direct_contact_rate: totalCalls ? totalDirect / totalCalls : 0,
      avg_call_duration_sec: weighted("duracion_promedio"),
      avg_ring_duration_sec: weighted("timbre_promedio"),
      avg_talk_duration_sec: weighted("conversacion_promedio"),
    };
  }, [filteredOpsAgents]);

  const filteredClients = useMemo(() => {
    let rows = topClients;
    if (regionFilter !== "Nacional" && regionFilter !== "Quito + Guayaquil") rows = rows.filter((r) => r.regional === regionFilter);
    if (regionFilter === "Quito + Guayaquil") rows = rows.filter((r) => ["Quito", "Guayaquil"].includes(r.regional));
    if (agentFilter !== "Todos") rows = rows.filter((r) => r.agente_top === agentFilter);
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => [String(r.Cliente), r.negocio, r.regional, r.ruta, r.agente_top].join(" ").toLowerCase().includes(q));
  }, [regionFilter, agentFilter, search]);

  const clientMetrics = useMemo(() => {
    const rows = filteredClients;
    const count = rows.length || 1;
    const sum = (key) => rows.reduce((acc, r) => acc + (Number(r[key]) || 0), 0);
    return {
      productos_total_prom: sum("productos_total") / count,
      venta_tv: sum("venta_televenta_2026"),
      nuevos_tv: rows.filter((r) => r.es_nuevo_tv).length,
    };
  }, [filteredClients]);

  const statusShare = operationalStatus.map((s) => ({ ...s, share: s.llamadas / operationalKpis.total_calls }));
  const agentScopeActive = agentFilter !== "Todos";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge className="rounded-full">Solo métricas calculadas</Badge>
              <Badge variant="outline" className="rounded-full">Sin supuestos manuales</Badge>
              <Badge variant="outline" className="rounded-full">Base llamadas + base ventas</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Dashboard de televenta con fórmulas explícitas</h1>
            <p className="text-slate-600 mt-2 max-w-4xl">
              Esta versión elimina cifras inventadas. Cada bloque muestra métricas calculadas directamente desde los dos archivos. El filtro de <span className="font-medium">agente</span> solo afecta secciones derivadas del archivo de llamadas; no afecta ventas porque la base de ventas no trae agente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full md:w-auto">
            <Select value={regionFilter} onValueChange={(value) => { setRegionFilter(value); setAgentFilter("Todos"); }}>
              <SelectTrigger className="w-full md:w-56 rounded-xl bg-white"><SelectValue placeholder="Regional" /></SelectTrigger>
              <SelectContent>{regionOptions.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-full md:w-64 rounded-xl bg-white"><SelectValue placeholder="Agente" /></SelectTrigger>
              <SelectContent>{agentOptions.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
            <div className="relative w-full md:w-72">
              <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-xl bg-white" placeholder="Buscar cliente, negocio o ruta" />
            </div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full md:w-[1100px] rounded-2xl">
            <TabsTrigger value="operacion">Operación TV</TabsTrigger>
            <TabsTrigger value="rollout">Rollout</TabsTrigger>
            <TabsTrigger value="adopcion">Adopción</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="operacion" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
              <KpiCard title="Llamadas" value={fmtInt(agentScopeActive ? scopedOperational.total_calls : operationalKpis.total_calls)} sub={agentScopeActive ? `solo ${agentFilter}` : "conteo total del CSV"} icon={PhoneCall} />
              <KpiCard title="Clientes únicos" value={fmtInt(agentScopeActive ? scopedOperational.unique_clients : operationalKpis.unique_clients)} sub="conteo distinct Cliente" icon={Users} />
              <KpiCard title="Completadas" value={fmtInt(agentScopeActive ? scopedOperational.completed_calls : operationalKpis.completed_calls)} sub={fmtPct(agentScopeActive ? scopedOperational.contact_rate : operationalKpis.contact_rate)} icon={Phone} />
              <KpiCard title="Contacto directo" value={fmtInt(agentScopeActive ? scopedOperational.direct_contact_calls : operationalKpis.direct_contact_calls)} sub={fmtPct(agentScopeActive ? scopedOperational.direct_contact_rate : operationalKpis.direct_contact_rate)} icon={Target} />
              <KpiCard title="Duración prom." value={fmtSec(agentScopeActive ? scopedOperational.avg_call_duration_sec : operationalKpis.avg_call_duration_sec)} sub="promedio de Duración" icon={Timer} />
              <KpiCard title="Timbre prom." value={fmtSec(agentScopeActive ? scopedOperational.avg_ring_duration_sec : operationalKpis.avg_ring_duration_sec)} sub="promedio de Duración timbre" icon={Timer} />
              <KpiCard title="Conversación prom." value={fmtSec(agentScopeActive ? scopedOperational.avg_talk_duration_sec : operationalKpis.avg_talk_duration_sec)} sub="promedio de Duración llamada" icon={Timer} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2 rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Evolución diaria real</CardTitle>
                  <CardDescription>Agrupado por fecha del archivo de llamadas.</CardDescription>
                </CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={operationalDaily}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="fecha" tickFormatter={shortDate} minTickGap={18} />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="llamadas" fillOpacity={0.12} strokeWidth={2} />
                      <Area type="monotone" dataKey="completadas" fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="contacto_directo" fillOpacity={0.28} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Fórmulas operativas</CardTitle>
                  <CardDescription>Todo sale del primer archivo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border p-4 bg-white">Contactabilidad = llamadas con <span className="font-medium">Gestion_Español = COMPLETADO</span> / llamadas totales.</div>
                  <div className="rounded-2xl border p-4 bg-white">Contacto directo = llamadas cuyo <span className="font-medium">Tipificación 1</span> contiene <span className="font-medium">CONTACTO DIRECTO</span>.</div>
                  <div className="rounded-2xl border p-4 bg-white">Tiempos = promedios directos de <span className="font-medium">Duración</span>, <span className="font-medium">Duración timbre</span> y <span className="font-medium">Duración llamada</span>.</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Estatus operativos</CardTitle><CardDescription>Distribución del CSV de llamadas.</CardDescription></CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusShare} layout="vertical" margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tickFormatter={(v) => `${Math.round(Number(v) * 100)}%`} />
                      <YAxis type="category" dataKey="estatus" width={150} />
                      <Tooltip formatter={(v) => fmtPct(v)} />
                      <Bar dataKey="share" radius={[0, 10, 10, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Operación por agente</CardTitle><CardDescription>El filtro de agente sí aplica aquí porque sale del archivo de llamadas.</CardDescription></CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredOpsAgents}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="Agente" tick={{ fontSize: 11 }} interval={0} angle={-10} textAnchor="end" height={70} />
                      <YAxis tickFormatter={(v) => `${Math.round(Number(v) * 100)}%`} />
                      <Tooltip formatter={(v) => typeof v === "number" && v <= 1 ? fmtPct(v) : fmtSec(v)} />
                      <Line type="monotone" dataKey="contactabilidad" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="tasa_contacto_directo" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rollout" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
              <KpiCard title="Regional activa" value={regionFilter} sub={summary.note} icon={MapPinned} />
              <KpiCard title="Clientes TV Mar" value={fmtInt(summary.marchTvClients)} sub="distinct CLIENTE PBI con autor Televenta" icon={Rocket} />
              <KpiCard title="Clientes TV Abr" value={fmtInt(summary.aprilTvClients)} sub={fmtPct(summary.aprilVsMarchGrowth)} icon={Globe2} />
              <KpiCard title="Clientes TV Mar-Abr" value={fmtInt(summary.marAprTvClients)} sub={fmtPct(summary.twoMonthVsMonthOneGrowth)} icon={Users} />
              <KpiCard title="Clientes nuevos TV" value={fmtInt(newClients.marabr_nuevos)} sub={`${fmtPct(newClients.participacion_marabr)} del universo TV`} icon={UserPlus} />
              <KpiCard title="Contacto directo base" value={fmtPct(operationalKpis.direct_contact_rate)} sub="ancla operativa del CSV" icon={Target} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2 rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Compradores Televenta por etapa</CardTitle><CardDescription>Distinct clientes con Pedido Tipo Autor = Televenta.</CardDescription></CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={rollout}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="etapa" /><YAxis /><Tooltip formatter={(v) => fmtInt(v)} /><Bar dataKey="tv_clientes" radius={[10,10,0,0]} /></BarChart></ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Cómo se calcula</CardTitle><CardDescription>Sin inferencias de negocio.</CardDescription></CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border p-4 bg-white">Base aplicante: filas de ventas con <span className="font-medium">Año = 2026</span>, mes correspondiente y cliente con match contra llamadas.</div>
                  <div className="rounded-2xl border p-4 bg-white">Base resultante: conteo distinct de <span className="font-medium">CLIENTE PBI</span> con <span className="font-medium">Pedido Tipo Autor = Televenta</span>.</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="adopcion" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Compradores vs año pasado</CardTitle><CardDescription>Comparación por número de clientes compradores.</CardDescription></CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={yoyBuyers}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="corte" /><YAxis /><Tooltip formatter={(v) => fmtInt(v)} /><Bar dataKey="comercial_clientes" stackId="a" radius={[8,8,0,0]} /><Bar dataKey="televenta_clientes" stackId="a" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Fórmulas de adopción</CardTitle><CardDescription>Todo sale de la base de ventas.</CardDescription></CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border p-4 bg-white">Compradores comerciales = distinct clientes del periodo con cualquier venta en el universo de match.</div>
                  <div className="rounded-2xl border p-4 bg-white">Compradores Televenta = distinct clientes del periodo con <span className="font-medium">Pedido Tipo Autor = Televenta</span>.</div>
                  <div className="rounded-2xl border p-4 bg-white">Crecimiento total marzo vs 2025 = {fmtPct(summary.marchTotalBuyerGrowth)}. Crecimiento del componente comercial = {fmtPct(summary.marchCommercialBuyerGrowth)}.</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productos" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2 rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Productos | revisión integral Mar-Abr</CardTitle>
                  <CardDescription>
                    Cálculo integral sobre una cohorte fija de PDV: clientes que compraron por <span className="font-medium">Televenta</span> en marzo-abril 2026, con match de cliente, excluyendo <span className="font-medium">Manteca</span> y <span className="font-medium">Margarina</span> del conteo de SKU.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-medium">Base aplicante</p>
                    <p className="mt-2">PDV con compra <span className="font-medium">Pedido Tipo Autor = Televenta</span> en marzo-abril 2026 dentro del universo con match.</p>
                  </div>
                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-medium">Base resultante 2025</p>
                    <p className="mt-2">Distinct combinaciones <span className="font-medium">PDV + Código Producto</span> de esa misma cohorte en marzo-abril 2025, excluyendo Manteca y Margarina.</p>
                  </div>
                  <div className="rounded-2xl border bg-white p-4">
                    <p className="font-medium">Base resultante 2026</p>
                    <p className="mt-2">Distinct combinaciones <span className="font-medium">PDV + Código Producto</span> de esa misma cohorte en marzo-abril 2026, excluyendo Manteca y Margarina.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Qué sí muestra este bloque</CardTitle>
                  <CardDescription>Solo métricas calculadas integralmente desde la base.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border bg-white p-4">SKU promedio por PDV con <span className="font-medium">denominador fijo</span> de cohorte.</div>
                  <div className="rounded-2xl border bg-white p-4">Productos totales vendidos al grupo comparado entre <span className="font-medium">Mar-Abr 2025</span> y <span className="font-medium">Mar-Abr 2026</span>.</div>
                  <div className="rounded-2xl border bg-white p-4">Compradores activos del periodo, para explicar por qué el promedio por comprador puede moverse distinto.</div>
                  <div className="rounded-2xl border bg-white p-4">El filtro de <span className="font-medium">agente</span> no aplica aquí porque la base de ventas no trae agente.</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>SKU promedio por punto de venta</CardTitle>
                  <CardDescription>Promedio integral Mar-Abr 2025 vs Mar-Abr 2026 con cohorte fija de PDV Televenta 2026.</CardDescription>
                </CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productImpactChart}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <Tooltip formatter={(v) => `${Number(v).toFixed(2)} sku`} />
                      <Bar dataKey="promedio" radius={[8,8,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Productos totales de la cohorte</CardTitle>
                  <CardDescription>Distinct combinaciones PDV-producto vendidas a la misma cohorte.</CardDescription>
                </CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ periodo: "Mar-Abr 2025", combinaciones: productImpact.product_client_pairs_2025 }, { periodo: "Mar-Abr 2026", combinaciones: productImpact.product_client_pairs_2026 }]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <Tooltip formatter={(v) => fmtInt(v)} />
                      <Bar dataKey="combinaciones" radius={[8,8,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <KpiCard title="PDV cohorte" value={fmtInt(productImpact.cohort_size)} sub="Televenta Mar-Abr 2026 con match" icon={Users} />
              <KpiCard title="SKU prom. 2025" value={productImpact.avg_products_2025.toFixed(2)} sub="excluye Manteca y Margarina" icon={Package} />
              <KpiCard title="SKU prom. 2026" value={productImpact.avg_products_2026.toFixed(2)} sub="excluye Manteca y Margarina" icon={Package} />
              <KpiCard title="Variación SKU prom." value={fmtPct(productImpact.growth_avg_products)} sub="Mar-Abr 2026 vs 2025" icon={TrendingUp} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Descomposición del cálculo</CardTitle>
                  <CardDescription>Numerador y denominador explícitos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border bg-white p-4">Cohorte fija = <span className="font-medium">{fmtInt(productImpact.cohort_size)} PDV</span>.</div>
                  <div className="rounded-2xl border bg-white p-4">Mar-Abr 2025 = <span className="font-medium">{fmtInt(productImpact.product_client_pairs_2025)}</span> combinaciones PDV-producto / <span className="font-medium">{fmtInt(productImpact.cohort_size)}</span> PDV = <span className="font-medium">{productImpact.avg_products_2025.toFixed(2)}</span>.</div>
                  <div className="rounded-2xl border bg-white p-4">Mar-Abr 2026 = <span className="font-medium">{fmtInt(productImpact.product_client_pairs_2026)}</span> combinaciones PDV-producto / <span className="font-medium">{fmtInt(productImpact.cohort_size)}</span> PDV = <span className="font-medium">{productImpact.avg_products_2026.toFixed(2)}</span>.</div>
                  <div className="rounded-2xl border bg-white p-4">Variación = ({productImpact.avg_products_2026.toFixed(2)} / {productImpact.avg_products_2025.toFixed(2)}) - 1 = <span className="font-medium">{fmtPct(productImpact.growth_avg_products)}</span>.</div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>Lectura ejecutiva</CardTitle>
                  <CardDescription>Conclusión soportada por la base integral marzo-abril.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border bg-white p-4">En <span className="font-medium">{regionFilter}</span>, el SKU promedio por PDV de la cohorte Televenta Mar-Abr sube de <span className="font-medium">{productImpact.avg_products_2025.toFixed(2)}</span> a <span className="font-medium">{productImpact.avg_products_2026.toFixed(2)}</span>.</div>
                  <div className="rounded-2xl border bg-white p-4">Eso representa una mejora de <span className="font-medium">{(productImpact.avg_products_2026 - productImpact.avg_products_2025).toFixed(2)} SKU</span> por punto de venta.</div>
                  <div className="rounded-2xl border bg-white p-4">Además, los productos totales vendidos a la cohorte pasan de <span className="font-medium">{fmtInt(productImpact.product_client_pairs_2025)}</span> a <span className="font-medium">{fmtInt(productImpact.product_client_pairs_2026)}</span>, excluyendo Manteca y Margarina.</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ventas" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Ventas marzo del grupo impactado</CardTitle><CardDescription>Grupo impactado = clientes con al menos una llamada de marzo 2026 cuyo Tipificación 1 contiene CONTACTO DIRECTO.</CardDescription></CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={[{ periodo: "Mar 2025", valor: impactSales.mar2025 }, { periodo: "Mar 2026", valor: impactSales.mar2026 }]}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="periodo" /><YAxis tickFormatter={(v) => `${Math.round(Number(v)/1000)}k`} /><Tooltip formatter={(v) => fmtUsd(v)} /><Bar dataKey="valor" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader><CardTitle>Fórmula del crecimiento</CardTitle><CardDescription>Este KPI sí cambia por regional. No cambia por agente porque la base de ventas no trae agente.</CardDescription></CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl border p-4 bg-white">Base aplicante 1: clientes de marzo 2026 en llamadas con <span className="font-medium">Tipificación 1 contiene CONTACTO DIRECTO</span>.</div>
                  <div className="rounded-2xl border p-4 bg-white">Base aplicante 2: ventas de marzo 2025 y marzo 2026 de esos mismos clientes, sumando <span className="font-medium">Televenta + Comercial</span>.</div>
                  <div className="rounded-2xl border p-4 bg-white">Resultado = ({fmtUsd(impactSales.mar2026)} - {fmtUsd(impactSales.mar2025)}) / {fmtUsd(impactSales.mar2025)} = <span className="font-medium">{fmtPct(impactSales.growth)}</span>.</div>
                </CardContent>
              </Card>
            </div>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>Contexto mensual 2026 del grupo impactado</CardTitle><CardDescription>Mismo grupo de clientes impactados; ventas separadas por autor comercial vs televenta.</CardDescription></CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyImpact}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="mes" /><YAxis tickFormatter={(v) => `${Math.round(Number(v)/1000)}k`} /><Tooltip formatter={(v) => fmtUsd(v)} /><Bar dataKey="comercial" stackId="a" radius={[8,8,0,0]} /><Bar dataKey="televenta" stackId="a" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KpiCard title="Clientes visibles" value={fmtInt(filteredClients.length)} sub="tabla filtrada" icon={Users} />
              <KpiCard title="Venta TV visible" value={fmtUsd(clientMetrics.venta_tv)} sub="suma de clientes filtrados" icon={TrendingUp} />
              <KpiCard title="Nuevos TV visibles" value={fmtInt(clientMetrics.nuevos_tv)} sub="conteo en tabla filtrada" icon={UserPlus} />
            </div>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>Clientes que más explican el resultado</CardTitle><CardDescription>Top por venta Televenta Mar-Abr 2026 dentro del universo con match. El filtro de agente sí aplica porque sale del archivo de llamadas.</CardDescription></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-slate-500">
                        <th className="text-left py-3 pr-4">id_cliente</th>
                        <th className="text-left py-3 pr-4">Negocio</th>
                        <th className="text-left py-3 pr-4">Regional</th>
                        <th className="text-left py-3 pr-4">Ruta</th>
                        <th className="text-left py-3 pr-4">Agente top</th>
                        <th className="text-right py-3 pr-4">Llamadas</th>
                        <th className="text-right py-3 pr-4">Venta TV</th>
                        <th className="text-right py-3 pr-4">Venta comercial</th>
                        <th className="text-right py-3 pr-4">Venta total</th>
                        <th className="text-right py-3 pr-4">Prod. TV</th>
                        <th className="text-right py-3 pr-4">Prod. total</th>
                        <th className="text-center py-3 pr-4">Nuevo TV</th>
                        <th className="text-right py-3">Contactabilidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((row) => (
                        <tr key={`${row.Cliente}-${row.negocio}`} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-3 pr-4 font-medium">{row.Cliente}</td>
                          <td className="py-3 pr-4">{row.negocio}</td>
                          <td className="py-3 pr-4">{row.regional}</td>
                          <td className="py-3 pr-4">{row.ruta}</td>
                          <td className="py-3 pr-4">{row.agente_top}</td>
                          <td className="py-3 pr-4 text-right">{fmtInt(row.llamadas)}</td>
                          <td className="py-3 pr-4 text-right">{fmtUsd(row.venta_televenta_2026)}</td>
                          <td className="py-3 pr-4 text-right">{fmtUsd(row.venta_comercial_2026)}</td>
                          <td className="py-3 pr-4 text-right font-medium">{fmtUsd(row.venta_total_2026)}</td>
                          <td className="py-3 pr-4 text-right">{fmtInt(row.productos_tv)}</td>
                          <td className="py-3 pr-4 text-right">{fmtInt(row.productos_total)}</td>
                          <td className="py-3 pr-4 text-center">{row.es_nuevo_tv ? "Sí" : "No"}</td>
                          <td className="py-3 text-right">{fmtPct(row.contactabilidad)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm border-amber-200 bg-amber-50/50">
              <CardContent className="p-4 text-sm text-slate-700 leading-6">
                <div className="flex items-start gap-3"><AlertTriangle className="h-5 w-5 mt-0.5" /><p>En esta versión, si una métrica no puede calcularse directamente desde los archivos, no se muestra. No se atribuye venta a un agente cuando la base de ventas no trae agente.</p></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
