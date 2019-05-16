function randomString(strings: string[]): string {
  var randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
}

export function getRandomBadgesClassname() {
  return randomString([
    "badge-primary",
    "badge-secondary",
    "badge-success",
    "badge-danger",
    "badge-warning",
    "badge-info",
    "badge-light",
    "badge-dark",
    "badge-primary",
    "badge-secondary",
    "badge-success",
    "badge-danger",
    "badge-warning",
    "badge-info",
    "badge-light",
    "badge-dark",
    "badge-primary",
    "badge-secondary",
    "badge-success",
    "badge-danger",
    "badge-warning",
    "badge-info",
    "badge-light",
    "badge-dark",
    "badge-primary",
    "badge-secondary",
    "badge-success",
    "badge-danger",
    "badge-warning",
    "badge-info",
    "badge-light",
    "badge-dark"
  ]);
}

export function getRandomImage(): string {
  return `https://picsum.photos/750/300?random=${Math.floor(
    Math.random() * 1000
  ) + 1}`;
}
