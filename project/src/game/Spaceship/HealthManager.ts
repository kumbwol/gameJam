export class HealthManager
{
    public _currentHealth: number;
    private _maxHealth: number;

    constructor(maxHealth: number)
    {
        this._maxHealth = maxHealth;
        this._currentHealth = this._maxHealth;
    }

    public damage(amountOfDamage: number): void
    {
        this._currentHealth -= amountOfDamage;
    }

    public currentHelath(): number
    {
        return this._currentHealth;
    }

    public reset(): void
    {
        this._currentHealth = this._maxHealth;
    }
}