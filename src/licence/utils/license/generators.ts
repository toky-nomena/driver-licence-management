import type { DrivingLicenseGenerator } from './DrivingLicenseGenerator';
import { AB } from './impl/ab';
import { NB } from './impl/nb';
import { NL } from './impl/nl';
import { NS } from './impl/ns';
import { NT } from './impl/nt';
import { NU } from './impl/nu';
import { ON } from './impl/on';
import { PE } from './impl/pe';
import { QC } from './impl/qc';
import { YT } from './impl/yt';

export const generators: Record<string, DrivingLicenseGenerator> = {
  AB: new AB(),
  NB: new NB(),
  NL: new NL(),
  NS: new NS(),
  NT: new NT(),
  NU: new NU(),
  ON: new ON(),
  PE: new PE(),
  QC: new QC(),
  YT: new YT(),
};
