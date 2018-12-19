// @flow
import {
  Architecture,
  Artificial,
  Azure,
  Cloud,
  Creative,
  Elm,
  Hardware,
  JVM,
  Kodekino,
  ProjectManagement,
  Quality,
  Ruby,
  Rust,
  Security,
  User,
  Virtual,
  Web,
} from '../../styles/icon_exporter';

const icons = {
  architecture: Architecture,
  artificial: Artificial,
  azure: Azure,
  cloud: Cloud,
  creative: Creative,
  elm: Elm,
  hardware: Hardware,
  jvm: JVM,
  kodekino: Kodekino,
  project: ProjectManagement,
  quality: Quality,
  ruby: Ruby,
  rust: Rust,
  security: Security,
  user: User,
  virtual: Virtual,
  web: Web,
};

export function getIconFromSummary(summary: string) {
  const words: string[] = summary.split(/-| /);

  for (let i = 0; i < words.length; i += 1) {
    console.log(words[i]);
    if (icons[words[i].toLowerCase()]) {
      return icons[words[i].toLowerCase()];
    }
  }

  return null;
}

export function convertDateTimeToInTime(dateTime: string) {
  const dateNow = new Date();
  const dateEvent = new Date(dateTime);
  const timeDiff = dateEvent.getTime() - dateNow.getTime();
  const dayDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (timeDiff < 0) {
    return 'Now';
  }

  if (dayDifference > 0) {
    if (dayDifference === 1) {
      return `${dayDifference} Day`;
    }

    return `${dayDifference} Days`;
  }

  const hourDifference = Math.floor(timeDiff / (1000 * 3600));
  if (hourDifference > 0) {
    if (hourDifference === 1) {
      return `${hourDifference} Hour`;
    }

    return `${hourDifference} Hours`;
  }

  const minuteDifference = Math.floor(timeDiff / (1000 * 60));
  if (minuteDifference === 1) {
    return `${minuteDifference} Minute`;
  }

  return `${minuteDifference} Minutes`;
}

getIconFromSummary('Rust-kveld #5');
