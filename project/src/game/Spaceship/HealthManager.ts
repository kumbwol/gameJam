export class HealthManager
{
    public _currentHealth: number;
    private _maxHealth: number = 100;

    constructor()
    {
        this._currentHealth = this._maxHealth;
    }

    public damage(amountOfDamage: number): void
    {
        this._currentHealth -= amountOfDamage;
        if (this._currentHealth <= 0) this.die();
    }

    public die(): void
    {
        console.log("spaceship destroyed");
    }
}