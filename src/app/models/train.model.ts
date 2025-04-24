import { Vagon } from './vagon.model';

export interface Train {
description: any;
  id: number;
  name: string;
  wagons: Vagon[];
}
